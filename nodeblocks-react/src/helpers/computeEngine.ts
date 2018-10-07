export enum EngineStatus {
  'IDLE' = 'IDLE',
  'RUNNING' = 'RUNNING',
  'PAUSED' = 'PAUSED'
}

export class ComputeEngine {

  run() {
    console.log("Running");
    
  }

  stop() {
    console.log("Stopping");
    
  }

}