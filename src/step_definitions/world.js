import { World, setWorldConstructor } from '@cucumber/cucumber';

// 2. Create the custom World class
class PlaywrightWorld extends World {
  constructor(options) {
    super(options);
    // Initialize properties - they will be properly set in the setup file
    this.browser = undefined; 
    this.page = undefined; 
  }
}

setWorldConstructor(PlaywrightWorld);