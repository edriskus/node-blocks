export interface IJobType {
  id: string,
  title: string,
  gpu: boolean
}

export interface IJob {
  id: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  description: string;
  owner: string;
  type: string | IJobType;
  inputs: {[key: string]: any},
  results: {[key: string]: any},
  blocks?: number;
  running_blocks?: number;
  idle_blocks?: number;
}