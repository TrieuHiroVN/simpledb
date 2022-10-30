## Simple JSON Database

```js
const Database = require('simpledb');
const db = new Database('db.json');

db.set('key', 'values');
db.get('key');
db.has('key');
db.delete('key');
db.clear();
```