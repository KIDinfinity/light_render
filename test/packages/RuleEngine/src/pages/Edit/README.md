---
tag: packages/RuleEngine/pages
order: 1
title: Edit
group:
    title: RuleEngine
nav:
    title: packages
---

# Edit

## Rule Engine

### 数据结构
- xxx
  - info
  - scenerio []
    - info
    - conditions []
    - rules []
      - info
      - conditions []
        - atomName
        - atomFunc
      - results []
        - atomName
        - atomFunc

### 文件组织
- xxx
  - _components
    - FormItem
      - AtomNameFunc
  - BasicInfo
  - Scenerio
  - ScenerioBasicInfo
  - ScenerioConditions
  - ScenerioRules
     - Batch
       - AddLib
       - SelectLib
       - Add
         - Batch
         - Info
         - Conditions(ScenerioRuleConditions)
         - Results(ScenerioRuleResults)
     - Table
  - ScenerioRuleConditions
    - Info
    - Batch
      - AddLlib
      - SelectLib
      - Add
    - List
  - ScenerioRuleResults
    - Info
    - Batch
      - AddLlib
      - SelectLib
      - Add
    - List

    
