import { createClaim, configure } from './methods';
import { AxiomSnapApi } from './types';

export class MetamaskAxiomSnap {
  // snap parameters
  protected readonly snapOrigin: string;
  protected readonly snapId: string;

  public constructor(snapOrigin: string) {
    this.snapOrigin = snapOrigin;
    this.snapId = this.snapOrigin;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public getAxiomSnapApi = async (): Promise<AxiomSnapApi> => {
    return {
      createClaim: createClaim.bind(this),
      configure: configure.bind(this),
    };
  };
}
