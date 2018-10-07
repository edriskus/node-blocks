import { ComputeEngine } from "./computeEngine";

export class GpuComputeEngine extends ComputeEngine {

  run() {
    console.log("GPU Running");
    
  }

  stop() {
    console.log("GPU Stopping");
    
  }
}