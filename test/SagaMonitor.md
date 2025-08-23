# Saga Monitor

## 安装/卸载
安装: npm run saga
卸载: npm run uninstall-saga

注意：需要在presit安装，安装后可以切到其他分支，不会有影响。但如果切换到未升级umi的分支，重装依赖的过程中会卸载改动。<br><br>

## API

### effect 路径追踪

```javascript
  export default function* getAgentNoList({ payload }: any, { call, put }: any) {
    yield { trace: true }
  }
```

在任意一个effect里，yield一个 { trace: true } 的对象，就会自动打印出整个effect调用栈，功能类似于console.trace，不接受任何其他参数。<br>
返回值就是yield的对象本身，无意义<br>
支持的参数同getRecord（除了filterParams，这个trace只会追踪当前当次effect，继续筛选没有意义。其他参数和trace同级即可），参数说明见getRecord<br><br>

### 获取所有的effect及路径

```javascript
  import { getRecord } from 'dva';
  // anywhere
  getRecord({
    filterParams: {
      filterFn,
      preFilter,
      effect,
      modelName
    },
    skipSimplification, 
    attachPath,
    drawAllPath,
  });
```

在代码的任意地方，可以获取当前所有的effect记录，接受三个参数，但都是可选的，什么都不传也行<br>
会把记录返回回来，不会直接打印。<br>
可以在浏览器的console页面直接用window.getRecord执行该方法，这主要是为了处理难以复现的defect（就免去了重新刷新重新尝试复现的步骤）<br>
返回值是Array<Record> 或 Array<{ Record, PathInfo }>，具体会在下面讲
+ filterParams: 筛选effect记录，只返回符合条件的记录
  - filterFn: **recordOrEffect -> boolean** 可自定义筛选条件。会把记录下的所有effect作为参数传给回调，只要有一条effect返回为true，整个record都会返回，连带Path信息（path信息指的是如何从记录起点追踪到那条符合条件的记录）<br>
      （严格的来说，部分情况下，record记录下的部分effect不被认为属于当前record。这些effect也不会传给filterFn。这种特殊处理是为了使结果更符合一般逻辑，原因comment在了源码里，一般不需要关心）
  - preFilter: **recordOrEffect -> boolean** 不建议使用。用法同filterFn,但是是在进行简化前进行预先筛选。因为简化会扭曲记录，所以这种方式的筛选不会附带path信息。
  - effect: **string** 简化的filterFn，只要effect中涉及对应的effect/reducer name即认为满足条件，不支持数组或者其他pattern，这种需求还是需要用filterFn自己实现。 例: 'auditLog/logButton' 
  - modelName: **string** 简化的filterFn，只要effect中涉及指定的modelNamespace即认为满足条件

  另：filterParams内的所有参数都可以同时存在。一个record只有在同时满足所有条件的情况下才会被返回

+ skipSimplification: **boolean** 不建议使用。是否跳过简化，默认不跳过。简化主要是去掉无关的dva effect（除非项目代码中监听了该dva effect，这种情况会保留。dva effect包括set loading和@start/@end 这两种），以及简化复合effect记录，使其易于理解。如果希望更接近底层的实际记录，可以跳过简化。

+ attachPath: **boolean** 不建议使用。是否附上路径信息/画出路径，默认附上。如果为false，即便drawAllPath为true，也不会画出任何路径。
  
+ drawAllPath: **boolean** 默认为false，当路径只有一条时，会画出唯一的一条路径。当路径有多条时，只会画出其中的复杂路径，这是为了避免有多条路径时大量的绘画占用页面。如果为true，则会画出所有的路径（[补充解释在line 150](#complex)）

### 监听redux field

```javascript
  import { getListenerList, addListener } from 'dva';
  addListener(state => state.opusClaimAssessment.claimProcessData.claimDecision, shallowEqual, 
    { label: 'claimDecision', wrapTrace: true});
  addListener(state => state.opusClaimAssessment.claimProcessData.claimDecision, {
    label: 'claimDecision', 
    wrapTrace: true,
    compareFn: shallowEqual,
  })
  const listenerList = getListenerList(); 
```

addListener: 添加一条监听，依次接受三个参数。每次selector数据更新后，都会打印更新前和更新后的值，是哪个reducer更新的，以及这个reducer的路径追踪。可以在浏览器用该方法直接添加监听<br>
addListener支持两种参数模式，一种是selector(选择函数), compareFn（比较函数）, otherParams（参数对象，包含其他参数）。这种模式更接近useSelector。<br>
另一种是selector（选择函数），params（参数对象，包含所有参数），这种模式是为了方便绕过compareFn单独指定其他参数的情景。<br>
**注意：代码支持同时挂载任意数量的监听，因此不要在渲染流程或者其他会重复执行的代码内写addListener，这样的话会反复挂载重复的监听，当改动实际发生时，同时触发多条监听导致日志刷屏。最好在代码最外层挂载（或者在浏览器console内直接调用），这样可以确保挂载操作仅执行一次。在代码最外层挂载还有一个好处就是在系统加载时挂载可以确保捕捉到所有的变化。监听无法捕捉到在挂载监听前就发生的数据变动**<br>

getListenerList 不接受任何参数，会返回listener array，里面会有所有的监听，以及监听记录。<br>
可以用它来查询监听的记录，或者通过删除里面的数据来清除监听。（每做一次addListener就会往里面加一条数据，代表一个监听，该监听监听到的记录都会被记录在那条数据里面）（不过浏览器不能直接调用这个方法）<br><br>
无返回。
+ selector: **state -> any** 用法同useSelector，只是不是hook。每次数据更新都会拿store的数据call一次selector，如果返回的结果变了，就认为是一次更新，记录在监听数据内，并打印日志。
+ compareFn: **(a, b) -> boolean** 可选，用法同useSelector，用于判断两次的结果是否相同，a是上一次selector的返回，b是数据更新后的返回。如果不传compareFn，则默认用全等判断
+ label: **string** 可选，用于区分不同的监听。打印日志的时候会显示label，翻数据的时候也可以根据label判断，默认值 'value'
+ wrapTrace: **boolean** 可选，用于决定dispatch触发时监听时，打印路径通过console.trace直接打印还是通过wrap对象打印（wrap对象就是跟其他的路径相似，通过读trackLinkLikely来得到追踪路径）。默认是false，也就是通过console.trace打印。console.trace支持直接点击文件路径，更加直观，但占更大区域。只有dispatch触发的监听可以用console.trace，因为其他情况下都涉及异步。
+ showDiff: **boolean** 每次更新监听数据时，会进行一次diff并输出diff结果。如果监听的对象较大，希望直接知道改了什么，可以用这个方法。但如果对象太大了，会导致页面明显卡顿。（如果直接监听NB UW的controller并打开showDiff，会在短时间内连续十几次diff两个很大的对象，会造成性能问题。但不打开showDiff的话是没问题的）

### 通过事件监听任意的事件（不限于effect/reducer，可以是任意字符串）

```javascript
  export default function* getAgentNoList({ payload }: any, { call, put }: any) {
    yield put({
      type: 'sagaMonitor/startLog',
      payload: {
        effect,
        delay,
        repeative,
        // other getRecord params
      }
    })
  }
```
在特定事件触发的时候，打印当前的record，如果指定了effect，就只打印与effect相关的record，如果没指定，就打印所有的record。你可以用dispatch/put两种方式去做，所有参数都是可选的。<br>
返回值是传入的对象本身，无意义<br><br>

+ effect **pattern** 和take/takeEvery接受的第一个参数一样，可以是一个字符串，一个函数，一个数组，或者通配符等等。如果effect为空，则会在put/dispatch后立刻执行。（但delay仍有效）
+ delay **number** 默认值为200。在监听到事件后延迟多久再去获取记录（默认延迟是为了给被监听的effect执行的时间，如果等到被监听的effect完整的执行完毕再获取，我们得到的就是完整的记录）
+ repeative **boolean** 默认false。在监听到事件后是否继续监听。
+ others 支持getRecord内的所有参数，具体见getRecord。如果filterParams为空且effect不为空，则filterParams默认传{ effect }，即筛选出你要监听的方法。如果传了filterParams，则按filterParams来筛选，如果两个都没传，那就会返回当前的全部record。

### 接口监听

```javascript
export async function getTask(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/task/getTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}
getTask.trace = true;

export default {
  getTask,
};
```
支持getRecord的其他参数，和trace一样放到函数上就行<br>
小部分情况下想从接口追踪调用路径会有一点麻烦，因此做了这个功能<br>
但需要注意的是，如果是直接在UI层（比方说useEffect）里面调用，那么这个做法就不会追踪到，需要用通常的console.trace。<br>
这个工具从一开始的目的就是为了解决console.trace无法追踪saga调用链的问题，所以可以视为console.trace的补充<br>

### getActiveController
只能在浏览器直接调用，获取有活动记录的controller name，以方便设立监听。
通用的controller会被排在下面，task页面的controller name在前几位（通常这也是我们要监听的controller）
没有任何参数。

### restart 不建议使用，后续可能会去掉
用法同事件监听，但type换成 sagaMonitor/restart<br>
参数也是一样的<br><br>

目的是记录和比较初始化后各个事件的触发数量，找到一些潜在的循环逻辑。<br>
是发现代码隐患的一个尝试，不一定有效，也还没用过<br><br>

### updateSwitch
控制功能开关，功能开关有三个
```javascript
const monitorSwitch = {
  main: true,
  recordResult: false,
  supportRestart: false,
};
```
main代表sagaMonitor的功能。默认是打开的，打开的情况下sageMonitor会记录所有的saga/redux操作。这个开关只能在代码加载过程中更改（最外层），因为sage记录应当是连续的。（要么一直不记录，要么全程记录）<br>
supportRestart：是否支持restart功能，默认关闭。同样要在代码加载过程中更改<br>
recordResult：是否记录各个effect的返回值，默认关闭。打开的话存在潜在的内存占用问题，这点后面会详细写。除了支持布尔值，也支持数组。<br>
recordResult这个开关支持在代码执行过程中修改，比方说你打开了它，然后在5s后关闭。那么只有在这五秒间结束的effect才会记录返回值
<br>

控制方式:
```javascript
import { updateSwitch } from 'dva';
updateSwitch('main', false); //关闭整个sageMonitor功能
updateSwitch('recordResult', true); //记录所有的effect的返回值
export default (props) => {
  //... render code
  useEffect(() => {
    updateSwitch('recordResult', ['put', 'call']); //记录所有的put和call的结果
    const promise = dispatch({
      type: 'test',
    })
    promise?.then(() => updateSwitch('recordResult', false)) //停止记录
  }, [dependency])
}
```
需要注意的是，updateSwitch本身不会打印任何东西。打开开关后，仍然需要用yield {trace: true}/监听或者其他方式得到你想要的记录，那上面会有返回值的记录。<br>

## 记录判读
概念： 
  * record: 代码每一次dispatch任何东西，都会记录为一条record。
  * effect: 我们通常说的effect实际上是一个generator，是一个流程。要区分的话应该称其为dva effect。而在saga层面，并没有modelName, effect, reducer这些概念，在generator 每次yield给saga的对象被认为是一个effect。文档内/源码中提到的effect大多指的是saga effect。
  * scheduleMain: 主流程。record / put effect 下的 scheduleMain 对应的是匹配上的dva effect，而其余的（比方说复合effect，fork等）下的 scheduleMain 对应的是它开启的流程。流程以数组形式存在，对应的是流程内依次执行了哪些effect。
  * scheduleByOtherTake: 项目内监听流程。只有record/put会有这种子流程。项目内的take/takeEvery可以监听任意的事件，如果当前的事件触发了这些监听，这些监听所属的流程会呗记录在scheduleByOtherTake内。
    + 注意：一个事件可以被多处监听捕获。所以scheduleByOtherTake对应的不是一个流程，而是流程list，可以认为是effect的二维数组。
    + scheduleByOtherTake内记录的是执行监听的流程的完整流程。这个流程在执行take/takeEvery之前的effect也会被记录，尽管这些effect实际上和当前的record / put effect没有关系。
  * put effect: 虽然通常理解put和dispatch是等价的（实际上有细微区别），但在这里put和fork/takeEvery一样，只是record流程的一部分，并不是流程的起点。一切的起点来源于UI中的dispatch。
  * effectField: effect有时候会有PUT属性，或者FORK属性，TAKE属性等等（还包括CALL，ALL等等），这些属性不会同时存在。简单来说，这些属性在call saga提供的方法的时候就形成了，在yield之前（dva包了部分方法，主要用来实现自动补全namespace）。<br>
    比方说put({ type: 'test' })，返回值就是{ PUT: { action: { type: 'test' } } }，随后才yield出去，记录下来的effect因此也是有PUT属性的。因此这些属性里可以读出给saga方法传的参数，只是需要注意这些是经过包装和转译的。<br>
    不过saga和dva内部都是会call sagaEffect的，所以如果存在这种属性，里面的参数不一定是项目代码传过去的。另外FORK几乎都是内部call的，项目代码基本不会主动call，复合effect内部也会call Fork effect。
  * trace: 每个record都会记录是哪里发起的dispatch，这会记录在record下的三个字段：
    + trackLinkLikely: 这是最可能的代码位置，一般看这个就行
      - 用法：umi升级前把路径复制出来，当作字符串输入在日志上。会变成链接，点进去进sourceTab，就能看到dispatch所处的源码，然后往上翻就是源码所处的具体文件路径
      - umi升级后直接看路径本身就能看出文件路径
    + traceLinkArray: 这是所有可能的代码位置，trackLinkLikely实际上取的是traceLinkArray的第一条，也就是层级最深的那条
    + traceFullStack: 这是完整调用栈记录，包括框架内的层级记录。
  * path: 无论我们通过trace的方式，还是通过监听effect name的方式，还是干脆自己写一个filterFn，本质上都是在record下面翻到了一条符合要求的effect。但一个流程下面可以put多个effect，而且每个子流程同样可以put effect，所以实际路径可能是很深的。path是为了解决这个问题。
    + path: 会在所有的record下面挂一个path数组，这里面有每一步的path信息，但不建议读，这是供后续处理的。如果没有提供任何筛选条件（filterParams为空）则不会挂
    + pathInfo: 如果有path，且attachPath为true，代码会解析path并转换成pathInfo，里面会有每一步的effect（通常是put），可以清晰的看到是怎么一步步到目标effect的。可以直接读pathInfo，也可对着pathInfo到record里面一层层翻。pathInfo会和record挂在同一层。原本的Array<Record>会变成Array<{ Record, PathInfo }>
    + <div id='complex'>complexPath</div>: 如果effect的路径涉及到take（take包括takeEvery等复合effect，下同），同一个effect的路径会与两个或以上的record相关（一个建立监听，一个触发监听），这种情况下这些record会被同时返回，并带着各自的路径。但为了方便理解，在这种情况下还会在日志上直接打印监听关系，即便目前的方式不自动产生日志（比方说用的是getRecord），因为这种关系即便用对象记录也是难以理解的，必须用日志。整合后的complexPath（可能有多条）会直接挂在数组（Array<{ Record, PathInfo }>）的combinePath字段上，不建议直接读combinePath。没有涉及到take的effect路径不会被自动画出，除非drawAllPath为true
  * listener: 一般直接读日志输出即可，但也可以用getListenerList获得监听列表及所有changeset。
    + listenerItem: 监听列表中每个item代表一个监听，删除item直接相当于删除监听（所以不另外提供清监听方法），添加item相当于添加监听（建议还是用addListener添加）。item内还有这条监听的所有记录。item内有四个field：selector, compareFn, label, changeSet。其中三个都是addListener的入参，changeSet是监听到的历史记录。
    + changeSet: 监听历史记录的列表，里面有两种类型，一种是dispatch触发的，下面有两个字段，effect代表dispatch对应的record，value代表这次更新后的值。另一种是put触发的，下面有三个字段，effect代表put对应的effect记录，value代表更新后的值，fullRecord代表put effect的追踪路径。

## misc
  * 为什么有的输出方式是日志，有的是代码返回？<br>
      api可以分为两组（restart除外），redux监听的两个api，以及其它的effect追踪api。<br>
      redux监听正常肯定是日志输出，想从代码层面读取可以通过getListenerList<br>
      而对于effect追踪api，getRecord是代码返回，想代码处理或日志输出都可以。而其他的追踪api实际上是getRecord的变体，或者说是便捷入口。是可以通过getRecord实现的。因为日志输出最符合场景需要，所以只提供了直接的日志输出，真需要代码处理的话可以用getRecord实现。
  * 是否要合到主分支<br>
      暂不考虑。目前没有做开关/环境判断。而调试工具显然只是面对开发的，用户使用时应当关闭这个功能。另外需要测试也是一个问题。
  * 性能影响<br>
      saga活动的记录肯定要占内存，处理也需要走逻辑。如果一直操作不刷新的话确实存在记录会越堆越多的问题，但实际开发时不存在这种情况，处理逻辑占用的性能也是可以忽略不计的。<br>
      另外这里有一些单独的优化（和调试工具本身无关，是针对dva和saga的进一步优化），这些优化对于性能的影响其实也是可以忽略不计的，之前的优化已经做了99%，后面对框架理解加深之后再额外做的1%，这里顺便pack进来了。
  * 源码<br>
      可以直接到patches里面看，但那里不好读。调试工具大部分代码都写在了node_modules/dva-core/src/sagaMonitor文件内。这是新建的文件，里面的代码都是调试工具相关的。另外大部分的comment也写在了里面。<br>
      如果想直接改代码，需要改node_modules/dva-core/dist/index.esm.js，umi升级后，build的时候umi对所有组件都做了build的缓存。所以直接npm run start:dev是不会使改动生效的，需要先把node_modules/.cache 文件夹删了，再跑start。
  * 改动范围<br>
      虽然也可以在patches里面看，但方便起见还是在这里标明: dva, dva-core, redux-saga
  * 关于把库放到ctc的问题<br>
      有两个问题，一个是现在实际上有两个版本，一个是之前优化的，还有一个是现在带调试的。用patches的话只是一个commit的区别，用版本控制的话切换会更麻烦。另外一个是dva和dva-core以及dva-immer，dva-loading是在一个项目内的，打包也是一块打的，我不知道是怎么变成4个不同的组件的，知道的话请跟我说。
  * refEffect/refReducer<br>
      这里直接塞了effect/reducer的引用，umi升级前点进去就可以定位到文件。umi升级后需要把项目文件夹拖到source，再去点，也能定位到文件。定位effect和reducer本来也容易，这只是顺便做的功能。
  * 为什么filterParams下的effect不支持pattern<br>
      麻烦，而且我寻思pattern没什么人用，事件api下那个支持pattern的参数是顺便做的。
  * 复杂路径展示问题<br>
      复杂路径本质上是一个反向的树，或者说是多个record的路径逐渐收敛到了目标effect上。解析出来的combinePath是以终点作为起点，然后往回推（发散）的。一个反向的树读起来肯定是费劲的，但想用日志比较明显的打印出来也比较费劲。目前打印出来的效果本身也不算非常易懂，而且路径一长很容易换行，一旦换行就更难看了。如果有更好的想法可以跟我说。<br>
      另外在多次触发getRecord时，可能也会有些迷惑。比方说连续触发复杂路径上的yield { trace: true }，就会看到绘画 -> recordList打印 -> 绘画 -> recordList打印 这样的日志。<br>
      需要知道的是绘画是最早的，早于recordList打印和reducer listener日志，这种情况下绘画和其下方的recordList/listenerLog是匹配的。
  * umi升级影响<br>
      一个是打包记录变了，导致trace记录变了，点函数引用进源码之后不能直接判断文件位置了（需要先将项目文件夹拖进sourceTab）<br>
      另一个是现在会把依赖编译缓存到.cache文件夹。这导致两个问题，一个是每次改依赖都需要删缓存。另一个是删缓存之后再运行的时间明显加长（因为要写缓存）<br>
      我尝试过在配置上修改，一个是msfu.esbuild设为true，看描述是去掉了物理缓存，但没有用。<br>
      另一个是exclude，用正则去掉我要改的依赖及其相关的依赖，但报错了。可能是有一些依赖的依赖没有exclude掉。<br>
      exclude all的方式还没试，因为把esfu直接设为false的尝试成功了（实际上设为false之后改依赖不需要重新run了，早点发现能省不少时间）
  * 引用问题<br>
      引用主要影响的是后续改动对实际展示的值的影响。我们知道打印一个对象，然后再修改这个对象的属性。打印出来的对象是修改之后的对象的状态（最新的），而不是打印时的对象的状态。在这里会存在同样问题。如果引用是同一个，打印出来就是最新的。如果引用不是同一个（创建了一个新的对象），打印出来的是新的对象，后续改动不会被影响到。<br>
      effect会在记录时新建对象并记录新建的，后续改动不会影响到打印出来的effect，正常来说代码也不会去改effect。<br>
      action则分情况，如果目标不是effect，则打印的是同一个引用，如果是effect，打印的则是不同的引用（action发送的时候dva会新建一个对象），但原action的引用会被挂在新action下面，正常来说代码也不会去改action。<br>
      payload一直会是同一个引用，极少数代码（reducer）可能会去直接改payload，打印出来的也是最新的，需要稍加注意。<br>
      与payload同级的其他field极少用到，但如果用到了，也会是同一个引用。
  * 全量搜索问题<br>
      如果在同一个record下，有多条路径符合搜索条件，则只有第一条路径会被搜素出来。比方说一个record的effect里面put了两次B effect，搜索条件就是B effect。那么返回的record只有一个（两次put是属于同一个record的），然后pathInfo仅包含第一次put的路径。如果record涉及监听的话情况会复杂一些，pathInfo可能会有多条，这种情况的具体逻辑写在了源码的注释中，正常不会发生所以不用担心。<br>
      这么做是因为开发时认为没有必要，筛选record时拿到第一个符合条件的effect就会记录path并返回。如果固定完全遍历并记录所有符合条件的path，会增加代码复杂度。<br>
      如果后续确定有必要，则可以跟我说，我再去开发。<br>
      另：yield { trace: true }这种方式是通过effectId而不是type/action判断的，有很高的准确性，因此不存在全量搜索问题（永远只会有一个符合条件的记录）。<br>
      如果用这种方式去log，遇到了这类情况（一个record最终触发了两次目标effect），那yield { trace: true }会被触发两次。两次都会打印同一个record，然后附上各自的pathInfo，因此能看到两次各自的路径（画出来的路径是在pathInfo的基础上解析出来的，所以也会分别画出路径，如果符合绘画条件的话）。<br>
      但如果在后续代码中用getRecord({filterParams: { effect }})这种方式获取，只会获取到一个record，附上的pathInfo以及可能的路径绘画只有关于第一条的。
  * 返回值记录以及内存问题<br>
      在saga原本的版本中，saga的所有事件都无法追踪，因为不会有任何的记录和日志。但saga monitor会记录每一个事件，无论是reducer还是effect，以及这些事件触发了哪些take/takeLastest等等。换句话说，saga monitor会忠实的记录发生的一切，在有需要的时候，无论是跑到了yield {trace: true}，还是触发了监听，还是执行了getRecord，都能够在完整的记录中，一路追踪到事件最初的起源（最早的dispatch，以及这个dispatch所处的调用链）。<br>
      因此主开关只能一直打开或者一直关闭。做了一半的记录是没有任何意义的<br>
      但不需要担心这会带来内存问题，因为每个saga操作只是被记录到一个简单的小对象内，我长期同时跑带saga monitor的venus+opus，都没有遇到过内存问题。<br>
      但是，如果要记录effect的返回值，这样可能会带来内存问题，尤其是call返回的接口数据，select返回的state数据，都可能是很大的对象<br>
      这些call返回的数据通常会被处理后保存，state数据也会不断更新，在正常情况下，这些大对象会被垃圾回收处理掉，内存中只会保存处理后的接口数据（保存在state内），以及最新的state<br>
      如果我们记录这些返回值，就会在内存中一直保有这一刻的接口数据/state数据，这既让我们可以随时查出这个数据在此刻的状态，也会一直占用内存<br>
      因此一开始并没有做记录返回值的功能。但后面发现有的时候effect返回值对于debug还是很有价值的，于是做了返回值记录的开关，这样使用者可以自由的决定什么时候开启记录，以及指定记录哪几种effect。<br>