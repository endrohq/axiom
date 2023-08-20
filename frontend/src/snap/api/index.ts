import {
  MetamaskAxiomRpcRequest,
  SignMessageResponse,
  AxiomSnapApi,
} from '../typings';

export class MetamaskAxiomSnap {
  // snap parameters
  protected readonly snapOrigin: string;
  protected readonly snapId: string;

  public constructor(snapOrigin: string) {
    this.snapOrigin = snapOrigin;
    this.snapId = this.snapOrigin;
  }

  async sendSnapMethod<T>(
    request: MetamaskAxiomRpcRequest,
    snapId: string,
  ): Promise<T> {
    return await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        request,
        snapId,
      },
    });
  }

  async connect(params: Record<'version' | string, unknown> = {}) {
    await window.ethereum.request({
      method: 'wallet_enable',
      params: [
        {
          wallet_snap: {
            [this.snapId]: {
              ...params,
            },
          },
        },
      ],
    });
  }

  async configure(configuration?: Record<string, any>): Promise<void> {
    return this.sendSnapMethod(
      { method: 'fil_configure', params: { configuration } },
      this.snapId,
    );
  }

  async createClaim(message: string): Promise<SignMessageResponse> {
    return this.sendSnapMethod(
      { method: 'axiom_createClaim', params: { message } },
      this.snapId,
    );
  }
}
