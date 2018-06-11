install:
	npm install

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm test

build:
	rm -rf dist
	NODE_ENV=production npm run webpack

develop:
	npm run webpack-serve