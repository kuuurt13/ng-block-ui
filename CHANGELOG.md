## 1.0.0 (2018-4-5)

##### Other Changes

* **scripts:** Added prepublishOnly script ([8767db71](https://github.com/kuuurt13/ng-block-ui/commit/8767db71bc1295b0fad1549cab7aa07e51672215))

#### 1.0.0-rc.3 (2018-3-14)

##### Bug Fixes

* **http:** make module AOT compatible ([1f76c9cf](https://github.com/kuuurt13/ng-block-ui/commit/1f76c9cf589d0458fa5ae65dbbb02b9ffaafb866))

#### 1.0.0-rc.2 (2018-3-13)

##### Bug Fixes

* **module:** make forRoot settings AOT compatible (#53) ([314e3205](https://github.com/kuuurt13/ng-block-ui/commit/314e32051fb8b64fe2ca4043e171a561a6fbc94c))

#### 1.0.0-rc.1 (2018-3-11)

##### Documentation Changes

* **readme:**
  * Added isActive documentation (#40) ([de97fa7c](https://github.com/kuuurt13/ng-block-ui/commit/de97fa7ca7eb8c19c1e8997f64a31bd361d7bb1d))
  * fixed table layouts ([dd85481c](https://github.com/kuuurt13/ng-block-ui/commit/dd85481c7284c33fe33d938ccb47282a8e2dad7c))
* **http:** block ui http module (#38) ([d19e54df](https://github.com/kuuurt13/ng-block-ui/commit/d19e54df41a3d5afaa0df3238488ed4ae4690959))
* **router:** block ui route guard (#39) ([eb794de8](https://github.com/kuuurt13/ng-block-ui/commit/eb794de89bdeff15bb05ab6434891864c610f8f6))
* **all:** 1.0.0 updates and improvements (#41) ([e790e967](https://github.com/kuuurt13/ng-block-ui/commit/e790e967330867752c30e36adbdebb31ffadec1b))
* **migration:** Added 1.0.0 migration guide (#41) ([b7990c2c](https://github.com/kuuurt13/ng-block-ui/commit/b7990c2c49c12b403edd29bf0515572f4548d047))
* **contrib:** Add contributing guidelines (#41) ([d35aca88](https://github.com/kuuurt13/ng-block-ui/commit/d35aca8883ab077f5cc89103939c38c638720d3c))
* **clarification:** Clarify that NgBlockUI's reset() method does not take into account `delayStop` option (#46) ([a3192eef](https://github.com/kuuurt13/ng-block-ui/commit/a3192eefb20912367dcd0c473d5bc8b03a2c5ea8))

##### New Features

* **http:** auto block on http requests (#38) ([e5a8d47a](https://github.com/kuuurt13/ng-block-ui/commit/e5a8d47a0759dbd2b70f99cb4b456584df3ca7ac))
* **router:** prevent navigation when blocking (#39) ([5a131ac3](https://github.com/kuuurt13/ng-block-ui/commit/5a131ac330786703fa6834ba5cbf39d7cc24fa4e))
* **blockUI:** add isActive boolean to blockUI instance (#40) ([ecc1b689](https://github.com/kuuurt13/ng-block-ui/commit/ecc1b689090c1b27135e006f4908afde0311ed2b))
* **settings:** settings can now be set globally at module level ([c4010c27](https://github.com/kuuurt13/ng-block-ui/commit/c4010c27f625ab2a616dd2518bf7cda78da90276))

##### Bug Fixes

* **directive:** use renderer to add class for Angular Universal (#49) (#50) ([2bab554e](https://github.com/kuuurt13/ng-block-ui/commit/2bab554e151ed9eab5a292fd31a0f50cee1c5af0))
* **module:** set settings to empty object by default ([0bc9fd4b](https://github.com/kuuurt13/ng-block-ui/commit/0bc9fd4ba9a41bfc50d712591d04a99db4347212))

##### Other Changes

* **demo:** use systemjs to dynamically test load lib changes (#41) ([bdb97b6e](https://github.com/kuuurt13/ng-block-ui/commit/bdb97b6e1a5a4d6e8575785f1a590012b3f848a1))

##### Tests

* **http:** add tests for BlockUIHttpModule (#38) ([22ef1a7f](https://github.com/kuuurt13/ng-block-ui/commit/22ef1a7fd1e1048a51d54a859806f3611d1cf93b))
* **router:** added prevent navigation tests ([649c6c4f](https://github.com/kuuurt13/ng-block-ui/commit/649c6c4fae8dad35d4ef1d094316b997527aff02))
* **module:** added module settings tests ([a87b9c1d](https://github.com/kuuurt13/ng-block-ui/commit/a87b9c1d63c41c49bd63861f663eb5e9655d45b6))
* **all:** fix BlockUIModule imports ([612e883e](https://github.com/kuuurt13/ng-block-ui/commit/612e883e43c35b909532eaadc234d5627f0682ce))

#### 0.9.5 (2018-3-5)

##### Bug Fixes

* **component:** Check if blockUISubscription is defined before unsubscribing (#52) ([157281d3](https://github.com/kuuurt13/ng-block-ui/commit/157281d3d87d4ce088f48b1da13fef8420089496))

#### 0.9.4 (2018-1-22)

##### Other Changes

* **component:** Make message public for BlockUIContentComponent (#51) ([0da8dc10](https://github.com/kuuurt13/ng-block-ui/commit/0da8dc10341b5f5f1231460dbaccb8058ea3f940))

#### 0.9.3 (2017-11-22)

##### Bug Fixes

* **directive:** fix delay start/stop (#44) ([e0283325](https://github.com/kuuurt13/ng-block-ui/commit/e02833250d65e8e37193ba1c993894d02b5ad65b))

#### 0.9.2 (2017-8-27)

##### Bug Fixes

* **content:** Explicitly detect changes when block event is dispatched (#33) ([6b2c77a9](https://github.com/kuuurt13/ng-block-ui/commit/6b2c77a9b9deefd5375486bb8cf33e895b0f37c0))

#### 0.9.1 (2017-8-9)

##### Other Changes

* **all:** Change message type to any (#29) ([35a66117](https://github.com/kuuurt13/ng-block-ui/commit/35a661171a4ea6e2073bc0ed3fd8271fbbe8b383))

### 0.9.0 (2017-7-23)

##### New Features

* **core:** Added delay start/end settings - (#24) ([c27faee6](https://github.com/kuuurt13/ng-block-ui/commit/c27faee6a6cabab091f51d7a6dff78b8262e9eea))

### 0.8.0 (2017-7-11)

##### New Features

* **directive:** Allow settings to be passed (#27) ([e61ae064](https://github.com/kuuurt13/ng-block-ui/commit/e61ae0647cb87318e911c46b2f029d6ab56c3039))

#### 0.7.2 (2017-5-30)

##### Documentation Changes

* **npm:** Added npm monthly downloads badge ([d9d4b353](https://github.com/kuuurt13/ng-block-ui/commit/d9d4b35386fcb88a2ddff9cbda172fb88a6d4a8c))
* **examples:** Add more plunker examples ([15f6d0f3](https://github.com/kuuurt13/ng-block-ui/commit/15f6d0f38a4e82d03d8b77a9f13d74820e780141))

##### Bug Fixes

* **compile:** Compile with "noImplicitAny": true (#22) ([ee63798b](https://github.com/kuuurt13/ng-block-ui/commit/ee63798b463d9ae2ad7138c66c60790b06f7cc74))

#### 0.7.1 (2017-5-9)

##### Documentation Changes

* **BlockUIService:** Fix methods table ([d0c3db75](https://github.com/kuuurt13/ng-block-ui/commit/d0c3db7522b91706f5799adb9c4ed613878b740c))

##### New Features

* **component:** Add support for custom templates (#20) ([fa86970f](https://github.com/kuuurt13/ng-block-ui/commit/fa86970f820998ca685b350523d42c8111dd949b))

##### Bug Fixes

* **component:** Set css to be fixed position by default ([66f77bc2](https://github.com/kuuurt13/ng-block-ui/commit/66f77bc22744534c49849b2f98c5b8cf3dbae9e4))

### 0.7.0 (2017-5-7)

##### Documentation Changes

* **BlockUIService:** Fix methods table ([d0c3db75](https://github.com/kuuurt13/ng-block-ui/commit/d0c3db7522b91706f5799adb9c4ed613878b740c))

##### New Features

* **component:** Add support for custom templates (#20) ([fa86970f](https://github.com/kuuurt13/ng-block-ui/commit/fa86970f820998ca685b350523d42c8111dd949b))

### 0.6.0 (2017-5-1)

##### New Features

* **service:** Introduce new BlockUIService (#18) ([364e5316](https://github.com/kuuurt13/ng-block-ui/commit/364e5316cb3b4fc7777e9d2dc5d4aa10c95c147f))

#### 0.5.1 (2017-4-24)

##### Bug Fixes

* **directive:** Fix IE compatibility issue - (#17) ([96a33730](https://github.com/kuuurt13/ng-block-ui/commit/96a337304b37ec93efe791085020783d30255473))

##### Other Changes

* **docs:**
  * Add NgBlockUI methods overview - #12 ([f6ac137d](https://github.com/kuuurt13/ng-block-ui/commit/f6ac137dfcdc1bf57788aac9d2c83a08733f7f14))
  * Add component default message usage/example ([e51584d3](https://github.com/kuuurt13/ng-block-ui/commit/e51584d3fd06ff96460654afd36eedcecd8b7606))

### 0.5.0 (2017-4-15)

##### Chores

* **build:** Added npm publish scripts ([429514e7](https://github.com/kuuurt13/ng-block-ui/commit/429514e75dfffd1b4ae9bce2df4a5cdb44f33203))

##### New Features

* **component:** Show spinner cursor when blocking ([752944ca](https://github.com/kuuurt13/ng-block-ui/commit/752944ca61804e762cdfeb4722f52ffb33427279))

##### Other Changes

* **rxjs:** Import methods to avoid importing all of rxjs ([87b7fe3f](https://github.com/kuuurt13/ng-block-ui/commit/87b7fe3f276ede0a22f7c269ea1c3c812fb86d06))
* **docs:**
  * Add directive usage to docs (#12) ([905fc406](https://github.com/kuuurt13/ng-block-ui/commit/905fc40616f844b1a825c96c7a253a0dc2367f40))
  * Configuring SystemJS  (#14) ([5bdaf99a](https://github.com/kuuurt13/ng-block-ui/commit/5bdaf99a58bc3a6b9a022e8a1d97af146e42b93f))
  * Add examples section with plunker link ([d4499c65](https://github.com/kuuurt13/ng-block-ui/commit/d4499c65c6754d2e3273411c8fd146cf1d0c91b8))
  * Add npm url to npm badge ([41fa9909](https://github.com/kuuurt13/ng-block-ui/commit/41fa9909367fb22e8b29f53c2fe464a67c3288ad))
* **ci:** Update karma to use chrome for testing ([bd093576](https://github.com/kuuurt13/ng-block-ui/commit/bd093576835c8e75c8ab085440ea1d642dabcdea))

##### Tests

* **tests:** Added blockUI directive tests ([d7a3f79e](https://github.com/kuuurt13/ng-block-ui/commit/d7a3f79e6220363bdd1284e081031d3ad113fc12))

#### 0.4.1 (2017-3-25)

##### Bug Fixes

* **component:** Active should be a property ([d5184987](https://github.com/kuuurt13/ng-block-ui/commit/d51849877d14c73bb33c7b769f26ff98a17f499e))

#### 0.4.0 (2017-3-9)

##### New Features

* **component:** Ability to set a default message (#10) ([1ac8cf86](https://github.com/kuuurt13/ng-block-ui/commit/1ac8cf86f7c4f15bf2245bd54e4c4d95949e1798))

#### 0.3.2 (2017-3-8)

##### Other Changes

* **lib:** Added systemjs support (#8) ([cfd3c65b](https://github.com/kuuurt13/ng-block-ui/commit/cfd3c65b14a45a62e91d352043853158a7055819))

#### 0.3.1 (2017-2-28)

##### Bug Fixes

* **lib:** Switch module code generation to commonjs ([b0318e66](https://github.com/kuuurt13/ng-block-ui/commit/b0318e66716a5703fc79a1106ca0300c77e7517b))

### 0.3.0 (2017-2-26)

##### New Features

* **component:** Added block-ui component (#4) ([3363c079](https://github.com/kuuurt13/ng-block-ui/commit/3363c079fc8f6d2546d2ae52b864d03bbbf7af0e))
* **decorator:** Added NgBlockUI type (#3) ([68680baf](https://github.com/kuuurt13/ng-block-ui/commit/68680baf5459c0963a33be3a47e1fc38aeb216c0))

