import { createAlova } from "alova";
import GlobalFetch from "alova/GlobalFetch";
import reactHook from "alova/react";
import { Address } from "./Address.model";

export class ServiceCEP {
    alovaInstance = createAlova({
        statesHook: reactHook,
        requestAdapter: GlobalFetch(),
        responded: {
            onSuccess: async (response) => {
                const json = await response.json();
                if (response.status >= 400) {
                    throw json;
                }
                return json;
            }
        }
    });

    async getAddressByCEP(cep: string): Promise<Address> {
        try {
            const response = await this.alovaInstance.Get<Address>(`https://viacep.com.br/ws/${cep}/json/`).send();
            return response;
        } catch {
            throw new Error('Erro ao obter endereço');
        }
    }
}