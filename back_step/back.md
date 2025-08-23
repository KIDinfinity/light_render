2025-08-22

创建 Spring Boot 项目

使用 Spring Initializr 或 IDE（如 IntelliJ）创建项目
添加必要依赖（Spring Web, Spring Data JPA, H2/MySQL, Spring Security）
配置数据库连接

使用 H2（内存数据库）或 MySQL
配置 application.yml 或 application.properties
创建用户实体类（User Entity）

包含用户名、密码等字段
使用 JPA 注解映射数据库表
创建用户仓库（UserRepository）

用于数据库操作
创建用户服务层（UserService）

包含注册、登录逻辑
密码加密（使用 BCrypt）
创建控制器（UserController）

提供 /login 和 /register 接口
接收 JSON 请求，返回 JSON 响应
配置 Spring Security

自定义登录逻辑
放行注册接口
使用 Postman 测试接口

测试注册和登录流程
查看响应和状态码

---
注：

一.依赖介绍（Spring Web, Spring Data JPA, H2/MySQL, Spring Security）

1. Spring Web 示例：创建一个简单的 REST 接口
```
@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, Frank!";
    }
}
```
说明：这个接口可以通过 Postman 访问 GET http://localhost:8080/api/hello，返回字符串。Spring Web 提供了 @RestController、@GetMapping 等注解来处理 HTTP 请求。

2. Spring Data JPA 示例：定义用户实体和数据库操作
```
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
}

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
```
你可以通过 UserRepository 自动查询数据库中的用户信息，无需写 SQL。Spring Data JPA 会自动生成实现。

3.H2 数据库示例：配置内存数据库
在 application.properties 中添加：
```
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
```
说明：启动项目后，访问 http://localhost:8080/h2-console 可以看到数据库界面。你可以看到 User 表和数据。

4.Spring Security 示例：保护接口，要求登录
```
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .antMatchers("/api/hello").authenticated()
            .and()
            .httpBasic(); // 使用基本认证
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
            .withUser("frank")
            .password("{noop}123456") // {noop} 表示不加密
            .roles("USER");
    }
}
```
说明：访问 /api/hello 时需要提供用户名 frank 和密码 123456，否则会返回 401 未授权。Spring Security 提供了认证和授权机制。

-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
