install:
	npm install

lint:
	npm run eslint .

test:
	npm test

build:
	npm run webpack

publish:
	npm run surge --project ./ --domain rssreader-s258.surge.sh
