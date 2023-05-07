# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

## [1.11.0] - 2023-05-07
### Added
- Dep: @babel/cli
- Dep: babel-plugin-check-es2015-constants
- Dep: babel-plugin-transform-member-expression-literals
- Dep: babel-plugin-transform-minify-booleans
- Dep: babel-plugin-transform-property-literals
- Dep: babel-plugin-transform-remove-console
- .babelrc
- Switch to using babel-cli for transpiling build

### Improved
- Dep: Upgrade @valkyriestudios/utils to 7.0.0
- Dep: Upgrade @babel/core to 7.21.8
- Dep: Upgrade eslint to 8.40.0

### Removed
- Dep: gulp
- Dep: gulp-babel
- Dep: @babel/plugin-proposal-class-properties
- gulpfile

## [1.10.0] - 2023-04-29
### Improved
- Dep: Upgrade @valkyriestudios/utils to 6.2.0
- Dep: Upgrade @babel/core to 7.21.5
- Dep: Upgrade @babel/preset-env to 7.21.5 

## [1.9.0] - 2023-04-23
### Improved
- Dep: Upgrade @valkyriestudios/utils to 6.1.0
- Dep: Upgrade eslint to 8.39.0
- Reduce eventual bundle size for package

## [1.8.1] - 2023-04-01
### Fixed
- helper:serializeResponseType: No longer allowed an empty string to be a response type

## [1.8.0] - 2023-04-01
### Added
- Dep: eslint@8.37.0

### Improved
- Dep: Upgrade @valkyriestudios/utils to 5.3.1
- Dep: Upgrade @babel/core to 7.21.4
- Dep: Upgrade @babel/preset-env to 7.21.4
- Node Scenario: Only positive integers above 0 are now allowed for timeout options
- Browser Scenario: Only positive integers above 0 are now allowed for timeout options
- helper:serializeTimeout: No longer allows passing anything but an integer above 0

### Fixed
- Node Scenario: Fix issue where working with timeout the timer would not be cleared correctly after abort, leading to ghost timer

## [1.7.1] - 2022-08-10
### Fixed
- Fix missing import

## [1.7.0] - 2022-08-10
### Improved
- Dep: Upgrade @valkyriestudios/utils to 5.1.0
- Dep: Upgrade @babel/core to 7.18.10
- Dep: Upgrade @babel/preset-env to 7.18.10
- Dep: Upgrade @babel/plugin-proposal-class-properties to 7.18.6
- helper:serializeOnProgress no longer throws if a non-function non-false is passed, instead it silently falls back to false
- helper:serializeTimeout no longer throws if a non-numeric non-false is passed, instead it silently falls back to false

### Fixed
- helper:serializeTimeout no longer allows passing a negative (below 0) number

## [1.6.0] - 2020-11-01
### Improved
- Dep: Upgrade @valkyriestudios/utils to 4.0.0

## [1.5.1] - 2020-08-13
### Improved
- Dep: Upgrade @babel/core to 7.11.1 from 7.1.6
- Dep: Upgrade @babel/plugin-proposal-class-properties to 7.10.4 from 7.1.0
- Dep: Upgrade @babel/preset-env to 7.11.0 from 7.1.6
- Dep: Upgrade gulp to 4.0.2 from 4.0.0

### Fixed
- Fixed an issue where if data of network call is undefined, a syntaxerror would be thrown

## [1.5.0] - 2018-11-18
### Improved
- Updated outdated packages, moved to gulp 4 and @babel

### Added
- Added responseType as a configurable option for browser/electron based scenarios

### Breaking
- Removed `version` function in Net

### Added
- Started a changelog
- Added badges for downloads/version to Readme

## [1.4.1] - 2017-11-22
### Fixed
- Fixed issue where scenario selection went haywire in specific circumstances

## [1.4.0] - 2017-11-20
### Improved
- Improved readme in regards to options for data payloads on post/put calls

### Added
- Added scenario selection for Electron environment

## [1.3.3] - 2017-10-23
### Fixed
- Fixed wrong documentation in readme

## [1.3.2] - 2017-10-21
### Fixed
- Fixed issue where Scenario blueprint was imported instead of Respond

## [1.3.1] - 2017-10-21
### Fixed
- Fixed issue where Scenario blueprint was imported instead of Respond

## [1.3.0] - 2017-10-20
### Added
- Prebuild net into a dist folder to prevent people having to build locally
- Add scenario selection for Nodejs

### Improved
- Cleanup codebase for readability

### Breaking
- Remove responseType as a configurable options

## [1.2.6] - 2017-10-18
### Fixed
- minor bugfixes

## [1.2.5] - 2017-10-18
### Fixed
- minor bugfixes

## [1.2.4] - 2017-10-17
### Fixed
- minor bugfixes

## [1.2.3] - 2017-10-17
### Fixed
- minor bugfixes

## [1.2.2] - 2017-10-17
### Fixed
- minor bugfixes

## [1.2.1] - 2017-10-17
### Fixed
- Fix issue with key definitions

## [1.2.0] - 2017-10-16
### Added
- Add progress handling
- Allow data to be passed to request
- Add querystring parameters as option

### Improved
- Improve folder/filter structure for better readability

## [1.1.0] - 2017-08-21
### Added
- Add MIT License
