---
tag: components/Auditlog
order: 0
---
## Audit Log 

#### diff
```
  with simple scalar values
    ✓ should return undefined for two identical numbers
    ✓ should return undefined for two identical strings
    ✓ should return { __old: <old value>, __new: <new value> } object for two different numbers
  with objects
    ✓ should return undefined for two objects with identical contents
    ✓ should return undefined for two object hierarchies with identical contents
    ✓ should return { <key>__deleted: <old value> } when the second object is missing a key
    ✓ should return { <key>__added: <new value> } when the first object is missing a key
    ✓ should return { <key>: { __old: <old value>, __new: <new value> } } for two objects with diffent scalar values for a key
    ✓ should return { <key>: <diff> } with a recursive diff for two objects with diffent values for a key
  with arrays of scalars
    ✓ should return undefined for two arrays with identical contents
    ✓ should return [..., ['-', <removed item>], ...] for two arrays when the second array is missing a value
    ✓ should return [..., ['+', <added item>], ...] for two arrays when the second one has an extra value
    ✓ should return [..., ['+', <added item>]] for two arrays when the second one has an extra value at the end (edge case test)
  with arrays of objects
    ✓ should return undefined for two arrays with identical contents
    ✓ should return [..., ['-', <removed item>], ...] for two arrays when the second array is missing a value
    ✓ should return [..., ['+', <added item>], ...] for two arrays when the second array has an extra value
    ✓ should return [..., ['~', <diff>], ...] for two arrays when an item has been modified (note: involves a crazy heuristic)
```
