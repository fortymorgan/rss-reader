install:
	npm install

lint:
	npm run eslint .

test:
	npm test

build:
	npm run webpack

publish:
	npm run webpack && npm run surge
