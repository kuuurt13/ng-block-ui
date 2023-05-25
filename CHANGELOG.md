#### 4.0.1 (2023-05-24)

Fix bad build/publish

#### 4.0.0 (2023-05-24)

Added Angular Ivy support ([dd541fe](https://github.com/kuuurt13/ng-block-ui/commit/dd541fec040e3baf3d9d5dd6f0b8833d424694ec))

#### 3.0.2 (2020-07-15)

##### Build System / Dependencies

- **deps:** bump underscore.string from 3.3.4 to 3.3.5 ([d5c16d11](https://github.com/kuuurt13/ng-block-ui/commit/d5c16d11ab6e70f156f3d7ec1b41f4a6dd1f9a22))

##### Chores

- **Deps:** Updated deps for dev app & examples ([3f7a662c](https://github.com/kuuurt13/ng-block-ui/commit/3f7a662c97c199f2a43eebe75a4119f79ca308a6))
- **deps:** Updated testing deps ([7c5f9bce](https://github.com/kuuurt13/ng-block-ui/commit/7c5f9bce89cf84668f73229de9766f4a057d70e5))
- **Docs:** Updated example dependencies ([ef2c0b8b](https://github.com/kuuurt13/ng-block-ui/commit/ef2c0b8b28fc0dc6b5748f468b2b6c5b5b04cd2a))

##### Bug Fixes

- **Module:** Add module type to ModuleWithProviders ([f6a117ac](https://github.com/kuuurt13/ng-block-ui/commit/f6a117ac401bd3371ceb78a3004150a775a77bb2))

#### 3.0.1 (2020-06-29)

##### Chores

- **deps:** Update ng-packagr ([a488da43](https://github.com/kuuurt13/ng-block-ui/commit/a488da439411d9b3c2d49475e01d334f4b32321f))
- **docs:** Updated blockAllRequestsInProgress docs ([854cbb43](https://github.com/kuuurt13/ng-block-ui/commit/854cbb43e0f39b19e5cdaa8ad2da5ce7e3513d91))
- **Development:**
  - Added new test scenario ([2ec60de5](https://github.com/kuuurt13/ng-block-ui/commit/2ec60de568ad1f284cdfc594de9dd44f05faf040))
  - Clean up development app ([59333099](https://github.com/kuuurt13/ng-block-ui/commit/593330997cf67860d161afb52a52f81888666ab8))

##### Continuous Integration

- **config:** Fixed Travis CI config ([1bf3986e](https://github.com/kuuurt13/ng-block-ui/commit/1bf3986e161fbc5e1c8c2fdbaa51ad20c50fc766))

##### New Features

- **Decorator:** Added "scopeToInstance" setting ([dc6b6a80](https://github.com/kuuurt13/ng-block-ui/commit/dc6b6a80852047711a48c597b3e7ffdf8375d1df))
- **BlockUIService:** Added update method ([c8b03884](https://github.com/kuuurt13/ng-block-ui/commit/c8b03884ce918d2c5c3d7211869f82b3b420507e))

##### Bug Fixes

- **Directive:**
  - Correctly find parent node ([9668a9f0](https://github.com/kuuurt13/ng-block-ui/commit/9668a9f0cc3f010048b7145e67a1b05a3a2620ea))
  - Stop blocking on destruction ([e994de01](https://github.com/kuuurt13/ng-block-ui/commit/e994de01d7ef4e61c0c0b05b44d1b71861cee854))
  - Fixed issue when finding "parentElement" for Ivy renderer ([75b13614](https://github.com/kuuurt13/ng-block-ui/commit/75b136149f1423c032950cb9df1c5f87251143ac))
  - Fixed default values in isComponentInTemplate method ([f56b5113](https://github.com/kuuurt13/ng-block-ui/commit/f56b5113b1a50bdf38bf9621144c910db52714c2))
  - Added ivy renderer support ([a8adc9d3](https://github.com/kuuurt13/ng-block-ui/commit/a8adc9d36f46d08e044713b3bad77c73a5cea0bd))
- **http:**
  - Issue with passing default settings ([009ecf7c](https://github.com/kuuurt13/ng-block-ui/commit/009ecf7c86c52244e4732d0f73ef2f34ae08664d))
  - Set default settings in provider to fix AOT error ([deebf716](https://github.com/kuuurt13/ng-block-ui/commit/deebf71639bfebee01a7e9fb4aea1b43bea27f7d))
- **BlockUI:**
  - Don't clear previous timeout on stop ([a04d3e56](https://github.com/kuuurt13/ng-block-ui/commit/a04d3e56da2062ac67b3702e539ee756e25d2aee))
  - Reset should only targets given instance ([684be370](https://github.com/kuuurt13/ng-block-ui/commit/684be3708d740bc2f549152fb195fb16e383c139))
- **BlockUIContent:** Fully clean up on destroy ([5542a1c9](https://github.com/kuuurt13/ng-block-ui/commit/5542a1c9dbc80a64487a229cc9424b50b56d41b4))

##### Other Changes

- **Http:** Default "blockAllRequestsInProgress" to true ([531c1dab](https://github.com/kuuurt13/ng-block-ui/commit/531c1dabb8369b7569172dda5d1ad3461ea0356a))

##### Refactors

- **BlockUI:** Rewrite block queueing in more cohesive way ([cc9c2e6c](https://github.com/kuuurt13/ng-block-ui/commit/cc9c2e6c1c607f2e407a8e70dc502b612d294ea2))

##### Tests

- **BlockUIContentComponent:** Add test coverage for non-delay ([#109](https://github.com/kuuurt13/ng-block-ui/pull/109)) ([20f785df](https://github.com/kuuurt13/ng-block-ui/commit/20f785df34ffb66b32349868624519c1b43a9caa))

#### 3.0.0 (2020-06-18)

##### Chores

- **deps:** Update ng-packagr ([a74e0871](https://github.com/kuuurt13/ng-block-ui/commit/a74e0871328cc3b2361ab5d191f2be287e3f29eb))
- **docs:** Updated blockAllRequestsInProgress docs ([a01d51c1](https://github.com/kuuurt13/ng-block-ui/commit/a01d51c16363f01ea739171092e373c28c10fad7))
- **Development:**
  - Added new test scenario ([138a73f4](https://github.com/kuuurt13/ng-block-ui/commit/138a73f42a94c85148293030b61a4b0d6ccf2f5d))
  - Clean up development app ([240be3a4](https://github.com/kuuurt13/ng-block-ui/commit/240be3a45e79d4d3f8162199f8d74e12d3eaf434))

##### Continuous Integration

- **config:** Fixed Travis CI config ([d9995b58](https://github.com/kuuurt13/ng-block-ui/commit/d9995b589f6b20db11a912ac555c540018713abe))

##### New Features

- **Decorator:** Added "scopeToInstance" setting ([1a70139b](https://github.com/kuuurt13/ng-block-ui/commit/1a70139bbe4e8ef92a489a0706459b9e3f84b3bb))
- **BlockUIService:** Added update method ([f145f874](https://github.com/kuuurt13/ng-block-ui/commit/f145f874c557b17bb6d1058dcf90286d2e5a84e5))

##### Bug Fixes

- **http:**
  - Issue with passing default settings ([6b45b79a](https://github.com/kuuurt13/ng-block-ui/commit/6b45b79aa88c2b55a6bb988bd72ec3af4af1e3d8))
  - Set default settings in provider to fix AOT error ([3c089611](https://github.com/kuuurt13/ng-block-ui/commit/3c0896112be3807a5bc7620270adf8307068bf63))
- **BlockUI:**
  - Don't clear previous timeout on stop ([41e49604](https://github.com/kuuurt13/ng-block-ui/commit/41e49604e70a8a11c6842077eced9f2174ac42f4))
  - Reset should only targets given instance ([226129cb](https://github.com/kuuurt13/ng-block-ui/commit/226129cbf5b49d98ed30e4c4fdfe4359fd7b02fc))
- **BlockUIContent:** Fully clean up on destroy ([3cddef29](https://github.com/kuuurt13/ng-block-ui/commit/3cddef298367d262db30fa7b073e15069423000c))
- **Directive:**
  - Stop blocking on destruction ([137403a2](https://github.com/kuuurt13/ng-block-ui/commit/137403a2430071364d795d67f921566ba390462c))
  - Fixed issue when finding "parentElement" for Ivy renderer ([927f0dd1](https://github.com/kuuurt13/ng-block-ui/commit/927f0dd1ae651b736a7b211312cd7f3378007e96))
  - Fixed default values in isComponentInTemplate method ([77eb5c39](https://github.com/kuuurt13/ng-block-ui/commit/77eb5c39af64d5165d67c572a70619b64e82c7a6))
  - Added ivy renderer support ([6d7a9034](https://github.com/kuuurt13/ng-block-ui/commit/6d7a903424e49c96102bb7342ceb788c64ed211f))

##### Other Changes

- **Http:** Default "blockAllRequestsInProgress" to true ([53375fd2](https://github.com/kuuurt13/ng-block-ui/commit/53375fd26722c825ab145de28ed9ed64b68b88b8))

##### Refactors

- **BlockUI:** Rewrite block queueing in more cohesive way ([0e36a6d5](https://github.com/kuuurt13/ng-block-ui/commit/0e36a6d52e7d28e45dbf713affe9a724dc485bb8))

##### Tests

- **BlockUIContentComponent:** Add test coverage for non-delay ([#109](https://github.com/kuuurt13/ng-block-ui/pull/109)) ([20f785df](https://github.com/kuuurt13/ng-block-ui/commit/20f785df34ffb66b32349868624519c1b43a9caa))

#### 2.1.8 (2019-10-21)

##### Bug Fixes

- **BlockUIContentComponent:** Run onStart, onStop and onUpdate methods without setTimeout if delay equals 0 ([b02c74ac](https://github.com/kuuurt13/ng-block-ui/commit/4d2f44c279509a304c6950d7169ace4d473c1c31))

#### 2.1.7 (2019-08-01)

##### Bug Fixes

- **block-ui-content:** Safely detect for changes ([#105](https://github.com/kuuurt13/ng-block-ui/pull/105)) ([b02c74ac](https://github.com/kuuurt13/ng-block-ui/commit/b02c74ace0f2014b9509f193f228d0951231ec52))

#### 2.1.6 (2019-07-11)

##### Bug Fixes

- **core:** Make Update method behave in a more synchronous way ([#103](https://github.com/kuuurt13/ng-block-ui/pull/103)) ([1e036e94](https://github.com/kuuurt13/ng-block-ui/commit/1e036e94dae462895996c49af39d1cac1b2d2773))

#### 2.1.5 (2019-06-11)

##### Build System / Dependencies

- **scripts:** Updated ng-packagr to 4.7.1 ([ee14a9d3](https://github.com/kuuurt13/ng-block-ui/commit/ee14a9d3e84ebcb1f7172bb7e08a7d7d96bd87a2))

##### Bug Fixes

- **BlockUIContentComponent:** Fixed type error ([9403d1af](https://github.com/kuuurt13/ng-block-ui/commit/9403d1af91853e75c24f7c50330e2cfcd32acd36))
- **http:** Restore "blockAllRequestsInProgress" setting ([#98](https://github.com/kuuurt13/ng-block-ui/pull/98)) ([dc24d8fc](https://github.com/kuuurt13/ng-block-ui/commit/dc24d8fc78c031e2164a2cbe285868bb3834766f))

#### 2.1.2 (2019-03-29)

##### Documentation Changes

- **examples:** Set version to "latest" ([84240b03](https://github.com/kuuurt13/ng-block-ui/commit/84240b038801bba4a2144489640d26b8af5309aa))

##### Bug Fixes

- **core:** Fixed issue with blocking concurrency ([#96](https://github.com/kuuurt13/ng-block-ui/pull/96)) ([#97](https://github.com/kuuurt13/ng-block-ui/pull/97)) ([4820007c](https://github.com/kuuurt13/ng-block-ui/commit/4820007cd1c8a5aa8e8cdb46c55710c7544dc6f2))

#### 2.1.1 (2019-02-01)

##### Documentation Changes

- **modules:** Fixed grammar ([#91](https://github.com/kuuurt13/ng-block-ui/pull/91)) ([d4c90aa1](https://github.com/kuuurt13/ng-block-ui/commit/d4c90aa19c72b116fe7f5a39fe0f29295595fa96))

##### Bug Fixes

- **BlockUIContentComponent:** updateInstanceBlockCount ([#92](https://github.com/kuuurt13/ng-block-ui/pull/92)) ([d5e29919](https://github.com/kuuurt13/ng-block-ui/commit/d5e29919e040b9eb002ea67c91b6f0653d1b2d11))

### 2.1.0 (2018-12-28)

##### Documentation Changes

- **http:**
  - Fixed grammar ([#90](https://github.com/kuuurt13/ng-block-ui/pull/90)) ([124863a2](https://github.com/kuuurt13/ng-block-ui/commit/124863a21771f3cd95307ff81993c21cdeae5bec))
  - Fix parameter ordering in README ([#89](https://github.com/kuuurt13/ng-block-ui/pull/89)) ([118fdba9](https://github.com/kuuurt13/ng-block-ui/commit/118fdba9ab2c8420bc8b856cd3b074645f33947e))
  - Fixed module settings syntax error ([aea5a9c8](https://github.com/kuuurt13/ng-block-ui/commit/aea5a9c8e9efface6c94fdcc1d702b0354e809cf))

##### New Features

- **interceptor:** Add a new settings option "blockAllRequestsInProgress" to keep blockUI until all requests are resolved ([dc1b482d](https://github.com/kuuurt13/ng-block-ui/commit/dc1b482da34e10843772325000e263f77153911b))

#### 2.0.0 (2018-11-10)

##### Documentation Changes

- **migration:** Added 2.0.0 migration guide ([7040ff3e](https://github.com/kuuurt13/ng-block-ui/commit/7040ff3e8cf15d0c4612b07c6bd989d0e537511d))

#### 2.0.0-beta.3 (2018-08-07)

##### Documentation Changes

- **examples:** include code examples within the repo ([#62](https://github.com/kuuurt13/ng-block-ui/pull/62)) ([b96809a0](https://github.com/kuuurt13/ng-block-ui/commit/b96809a0290cab5c95e63f8044225c067396c7e0))

##### Bug Fixes

- **build:** change build to follow APF standards ([#79](https://github.com/kuuurt13/ng-block-ui/pull/79)) ([dcff23fe](https://github.com/kuuurt13/ng-block-ui/commit/dcff23fec6fbcf90644df2035cc3f7f1c10c27d7))

#### 2.0.0-beta.2 (2018-07-22)

##### Documentation Changes

- **readme:** move examples to stackblitz ([#62](https://github.com/kuuurt13/ng-block-ui/pull/62)) ([b3ef7cd0](https://github.com/kuuurt13/ng-block-ui/commit/b3ef7cd018fd6790c60249237de22202686014db))

##### New Features

- **core:** queue multiple blocking calls ([#43](https://github.com/kuuurt13/ng-block-ui/pull/43)) ([e009aae4](https://github.com/kuuurt13/ng-block-ui/commit/e009aae4b774f6e27e5492346a7360218856986e))

#### 2.0.0-beta.1 (2018-07-14)

##### Chores

- **core:** upgrade to support Angular 6 & rxjs 6 ([56bd370b](https://github.com/kuuurt13/ng-block-ui/commit/56bd370b4fb3ee39a4c364759ed5b802feab8632))

#### 1.0.6 (2018-07-18)

##### Bug Fixes

- **service:** don't allow duplicate instances ([#74](https://github.com/kuuurt13/ng-block-ui/pull/74)) ([95903a33](https://github.com/kuuurt13/ng-block-ui/commit/95903a33828328fb8d05fa63740a3f251604bea1))

#### 1.0.5 (2018-07-11)

##### Bug Fixes

- **component:** fix blocking delays and multiple http calls ([#45](https://github.com/kuuurt13/ng-block-ui/pull/45)) ([2c344999](https://github.com/kuuurt13/ng-block-ui/commit/2c34499944c8a84c3b048acb5bd6a563d086ba22))

##### Other Changes

- **changelog:** add generate-changelog dependency ([82986999](https://github.com/kuuurt13/ng-block-ui/commit/82986999d424c8670decf23c4859a055715c3520))

#### 1.0.4 (2018-4-9)

##### Bug Fixes

- **http:** interceptor now waits for full request duration #57 ([8eaf83a7](https://github.com/kuuurt13/ng-block-ui/commit/8eaf83a7b67a4267db944c433f672f02a3f9bb36))

##### Other Changes

- **demo:** fixed local development setup ([242e400f](https://github.com/kuuurt13/ng-block-ui/commit/242e400fe0866f421d671e4d9aa899d36af4b15f))

#### 1.0.3 (2018-4-8)

##### Bug Fixes

- **build:** remove bundles from .npmignore ([e236dc15](https://github.com/kuuurt13/ng-block-ui/commit/e236dc156d5ce7cffeeaea52890a83e6a9619c23))

#### 1.0.2 (2018-4-8)

##### Bug Fixes

- **build:** add missing umd bundle ([63e7119d](https://github.com/kuuurt13/ng-block-ui/commit/63e7119d88910960174c0a949405f0a27fac65c2))

#### 1.0.1 (2018-4-8)

##### Bug Fixes

- **build:** flatten npm package structure ([68621f0a](https://github.com/kuuurt13/ng-block-ui/commit/68621f0aabc83da1d0db1e8535a19ea7bc3cfe0c))

## 1.0.0 (2018-4-5)

##### Other Changes

- **scripts:** Added prepublishOnly script ([8767db71](https://github.com/kuuurt13/ng-block-ui/commit/8767db71bc1295b0fad1549cab7aa07e51672215))

#### 1.0.0-rc.3 (2018-3-14)

##### Bug Fixes

- **http:** make module AOT compatible ([1f76c9cf](https://github.com/kuuurt13/ng-block-ui/commit/1f76c9cf589d0458fa5ae65dbbb02b9ffaafb866))

#### 1.0.0-rc.2 (2018-3-13)

##### Bug Fixes

- **module:** make forRoot settings AOT compatible (#53) ([314e3205](https://github.com/kuuurt13/ng-block-ui/commit/314e32051fb8b64fe2ca4043e171a561a6fbc94c))

#### 1.0.0-rc.1 (2018-3-11)

##### Documentation Changes

- **readme:**
  - Added isActive documentation (#40) ([de97fa7c](https://github.com/kuuurt13/ng-block-ui/commit/de97fa7ca7eb8c19c1e8997f64a31bd361d7bb1d))
  - fixed table layouts ([dd85481c](https://github.com/kuuurt13/ng-block-ui/commit/dd85481c7284c33fe33d938ccb47282a8e2dad7c))
- **http:** block ui http module (#38) ([d19e54df](https://github.com/kuuurt13/ng-block-ui/commit/d19e54df41a3d5afaa0df3238488ed4ae4690959))
- **router:** block ui route guard (#39) ([eb794de8](https://github.com/kuuurt13/ng-block-ui/commit/eb794de89bdeff15bb05ab6434891864c610f8f6))
- **all:** 1.0.0 updates and improvements (#41) ([e790e967](https://github.com/kuuurt13/ng-block-ui/commit/e790e967330867752c30e36adbdebb31ffadec1b))
- **migration:** Added 1.0.0 migration guide (#41) ([b7990c2c](https://github.com/kuuurt13/ng-block-ui/commit/b7990c2c49c12b403edd29bf0515572f4548d047))
- **contrib:** Add contributing guidelines (#41) ([d35aca88](https://github.com/kuuurt13/ng-block-ui/commit/d35aca8883ab077f5cc89103939c38c638720d3c))
- **clarification:** Clarify that NgBlockUI's reset() method does not take into account `delayStop` option (#46) ([a3192eef](https://github.com/kuuurt13/ng-block-ui/commit/a3192eefb20912367dcd0c473d5bc8b03a2c5ea8))

##### New Features

- **http:** auto block on http requests (#38) ([e5a8d47a](https://github.com/kuuurt13/ng-block-ui/commit/e5a8d47a0759dbd2b70f99cb4b456584df3ca7ac))
- **router:** prevent navigation when blocking (#39) ([5a131ac3](https://github.com/kuuurt13/ng-block-ui/commit/5a131ac330786703fa6834ba5cbf39d7cc24fa4e))
- **blockUI:** add isActive boolean to blockUI instance (#40) ([ecc1b689](https://github.com/kuuurt13/ng-block-ui/commit/ecc1b689090c1b27135e006f4908afde0311ed2b))
- **settings:** settings can now be set globally at module level ([c4010c27](https://github.com/kuuurt13/ng-block-ui/commit/c4010c27f625ab2a616dd2518bf7cda78da90276))

##### Bug Fixes

- **directive:** use renderer to add class for Angular Universal (#49) (#50) ([2bab554e](https://github.com/kuuurt13/ng-block-ui/commit/2bab554e151ed9eab5a292fd31a0f50cee1c5af0))
- **module:** set settings to empty object by default ([0bc9fd4b](https://github.com/kuuurt13/ng-block-ui/commit/0bc9fd4ba9a41bfc50d712591d04a99db4347212))

##### Other Changes

- **demo:** use systemjs to dynamically test load lib changes (#41) ([bdb97b6e](https://github.com/kuuurt13/ng-block-ui/commit/bdb97b6e1a5a4d6e8575785f1a590012b3f848a1))

##### Tests

- **http:** add tests for BlockUIHttpModule (#38) ([22ef1a7f](https://github.com/kuuurt13/ng-block-ui/commit/22ef1a7fd1e1048a51d54a859806f3611d1cf93b))
- **router:** added prevent navigation tests ([649c6c4f](https://github.com/kuuurt13/ng-block-ui/commit/649c6c4fae8dad35d4ef1d094316b997527aff02))
- **module:** added module settings tests ([a87b9c1d](https://github.com/kuuurt13/ng-block-ui/commit/a87b9c1d63c41c49bd63861f663eb5e9655d45b6))
- **all:** fix BlockUIModule imports ([612e883e](https://github.com/kuuurt13/ng-block-ui/commit/612e883e43c35b909532eaadc234d5627f0682ce))

#### 0.9.5 (2018-3-5)

##### Bug Fixes

- **component:** Check if blockUISubscription is defined before unsubscribing (#52) ([157281d3](https://github.com/kuuurt13/ng-block-ui/commit/157281d3d87d4ce088f48b1da13fef8420089496))

#### 0.9.4 (2018-1-22)

##### Other Changes

- **component:** Make message public for BlockUIContentComponent (#51) ([0da8dc10](https://github.com/kuuurt13/ng-block-ui/commit/0da8dc10341b5f5f1231460dbaccb8058ea3f940))

#### 0.9.3 (2017-11-22)

##### Bug Fixes

- **directive:** fix delay start/stop (#44) ([e0283325](https://github.com/kuuurt13/ng-block-ui/commit/e02833250d65e8e37193ba1c993894d02b5ad65b))

#### 0.9.2 (2017-8-27)

##### Bug Fixes

- **content:** Explicitly detect changes when block event is dispatched (#33) ([6b2c77a9](https://github.com/kuuurt13/ng-block-ui/commit/6b2c77a9b9deefd5375486bb8cf33e895b0f37c0))

#### 0.9.1 (2017-8-9)

##### Other Changes

- **all:** Change message type to any (#29) ([35a66117](https://github.com/kuuurt13/ng-block-ui/commit/35a661171a4ea6e2073bc0ed3fd8271fbbe8b383))

### 0.9.0 (2017-7-23)

##### New Features

- **core:** Added delay start/end settings - (#24) ([c27faee6](https://github.com/kuuurt13/ng-block-ui/commit/c27faee6a6cabab091f51d7a6dff78b8262e9eea))

### 0.8.0 (2017-7-11)

##### New Features

- **directive:** Allow settings to be passed (#27) ([e61ae064](https://github.com/kuuurt13/ng-block-ui/commit/e61ae0647cb87318e911c46b2f029d6ab56c3039))

#### 0.7.2 (2017-5-30)

##### Documentation Changes

- **npm:** Added npm monthly downloads badge ([d9d4b353](https://github.com/kuuurt13/ng-block-ui/commit/d9d4b35386fcb88a2ddff9cbda172fb88a6d4a8c))
- **examples:** Add more plunker examples ([15f6d0f3](https://github.com/kuuurt13/ng-block-ui/commit/15f6d0f38a4e82d03d8b77a9f13d74820e780141))

##### Bug Fixes

- **compile:** Compile with "noImplicitAny": true (#22) ([ee63798b](https://github.com/kuuurt13/ng-block-ui/commit/ee63798b463d9ae2ad7138c66c60790b06f7cc74))

#### 0.7.1 (2017-5-9)

##### Documentation Changes

- **BlockUIService:** Fix methods table ([d0c3db75](https://github.com/kuuurt13/ng-block-ui/commit/d0c3db7522b91706f5799adb9c4ed613878b740c))

##### New Features

- **component:** Add support for custom templates (#20) ([fa86970f](https://github.com/kuuurt13/ng-block-ui/commit/fa86970f820998ca685b350523d42c8111dd949b))

##### Bug Fixes

- **component:** Set css to be fixed position by default ([66f77bc2](https://github.com/kuuurt13/ng-block-ui/commit/66f77bc22744534c49849b2f98c5b8cf3dbae9e4))

### 0.7.0 (2017-5-7)

##### Documentation Changes

- **BlockUIService:** Fix methods table ([d0c3db75](https://github.com/kuuurt13/ng-block-ui/commit/d0c3db7522b91706f5799adb9c4ed613878b740c))

##### New Features

- **component:** Add support for custom templates (#20) ([fa86970f](https://github.com/kuuurt13/ng-block-ui/commit/fa86970f820998ca685b350523d42c8111dd949b))

### 0.6.0 (2017-5-1)

##### New Features

- **service:** Introduce new BlockUIService (#18) ([364e5316](https://github.com/kuuurt13/ng-block-ui/commit/364e5316cb3b4fc7777e9d2dc5d4aa10c95c147f))

#### 0.5.1 (2017-4-24)

##### Bug Fixes

- **directive:** Fix IE compatibility issue - (#17) ([96a33730](https://github.com/kuuurt13/ng-block-ui/commit/96a337304b37ec93efe791085020783d30255473))

##### Other Changes

- **docs:**
  - Add NgBlockUI methods overview - #12 ([f6ac137d](https://github.com/kuuurt13/ng-block-ui/commit/f6ac137dfcdc1bf57788aac9d2c83a08733f7f14))
  - Add component default message usage/example ([e51584d3](https://github.com/kuuurt13/ng-block-ui/commit/e51584d3fd06ff96460654afd36eedcecd8b7606))

### 0.5.0 (2017-4-15)

##### Chores

- **build:** Added npm publish scripts ([429514e7](https://github.com/kuuurt13/ng-block-ui/commit/429514e75dfffd1b4ae9bce2df4a5cdb44f33203))

##### New Features

- **component:** Show spinner cursor when blocking ([752944ca](https://github.com/kuuurt13/ng-block-ui/commit/752944ca61804e762cdfeb4722f52ffb33427279))

##### Other Changes

- **rxjs:** Import methods to avoid importing all of rxjs ([87b7fe3f](https://github.com/kuuurt13/ng-block-ui/commit/87b7fe3f276ede0a22f7c269ea1c3c812fb86d06))
- **docs:**
  - Add directive usage to docs (#12) ([905fc406](https://github.com/kuuurt13/ng-block-ui/commit/905fc40616f844b1a825c96c7a253a0dc2367f40))
  - Configuring SystemJS (#14) ([5bdaf99a](https://github.com/kuuurt13/ng-block-ui/commit/5bdaf99a58bc3a6b9a022e8a1d97af146e42b93f))
  - Add examples section with plunker link ([d4499c65](https://github.com/kuuurt13/ng-block-ui/commit/d4499c65c6754d2e3273411c8fd146cf1d0c91b8))
  - Add npm url to npm badge ([41fa9909](https://github.com/kuuurt13/ng-block-ui/commit/41fa9909367fb22e8b29f53c2fe464a67c3288ad))
- **ci:** Update karma to use chrome for testing ([bd093576](https://github.com/kuuurt13/ng-block-ui/commit/bd093576835c8e75c8ab085440ea1d642dabcdea))

##### Tests

- **tests:** Added blockUI directive tests ([d7a3f79e](https://github.com/kuuurt13/ng-block-ui/commit/d7a3f79e6220363bdd1284e081031d3ad113fc12))

#### 0.4.1 (2017-3-25)

##### Bug Fixes

- **component:** Active should be a property ([d5184987](https://github.com/kuuurt13/ng-block-ui/commit/d51849877d14c73bb33c7b769f26ff98a17f499e))

#### 0.4.0 (2017-3-9)

##### New Features

- **component:** Ability to set a default message (#10) ([1ac8cf86](https://github.com/kuuurt13/ng-block-ui/commit/1ac8cf86f7c4f15bf2245bd54e4c4d95949e1798))

#### 0.3.2 (2017-3-8)

##### Other Changes

- **lib:** Added systemjs support (#8) ([cfd3c65b](https://github.com/kuuurt13/ng-block-ui/commit/cfd3c65b14a45a62e91d352043853158a7055819))

#### 0.3.1 (2017-2-28)

##### Bug Fixes

- **lib:** Switch module code generation to commonjs ([b0318e66](https://github.com/kuuurt13/ng-block-ui/commit/b0318e66716a5703fc79a1106ca0300c77e7517b))

### 0.3.0 (2017-2-26)

##### New Features

- **component:** Added block-ui component (#4) ([3363c079](https://github.com/kuuurt13/ng-block-ui/commit/3363c079fc8f6d2546d2ae52b864d03bbbf7af0e))
- **decorator:** Added NgBlockUI type (#3) ([68680baf](https://github.com/kuuurt13/ng-block-ui/commit/68680baf5459c0963a33be3a47e1fc38aeb216c0))
