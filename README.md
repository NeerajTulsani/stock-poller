### Prerequisites
```
node version 20.11.1
```


### Project Setup
```
1. npm install
2. make change in config/dev_config.ts
2. cd config && ln -s dev_config.ts config.ts
3. ./node_modules/typescript/bin/tsc scripts/stock_poller.ts
```

### Execute
```
1. npm run poll (It will start the data polling and will save in mongodb)
2. npm run dev (It will start the development server for UI)
```
