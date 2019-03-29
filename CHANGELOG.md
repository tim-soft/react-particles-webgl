# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- This changelog
- Jest testing via Puppeteer

## [0.5.2] - 2019-3-28
### Added
- Snowfall preset to demo site
- `config.direction` prop for controlling particle velocity in x, y, z directions
- `config.boundaryType` prop for controlling interaction between particles and canvas boundary

### Fixed
- Prevent calculating line coords in animation loop if `config.lines.visible` is false
