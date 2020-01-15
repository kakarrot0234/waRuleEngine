import * as uuid from "uuid";

import { ICustomDefinedDataServiceNode } from "../interfaces/ICustomDefinedDataServiceNode";

export class CustomDefinedDataServiceNodeProvider {
    private m_CustomDefinedDataServiceNodes: ICustomDefinedDataServiceNode[] = [
        {
            Guid: uuid.v1(),
            DataKey: "MusteriTipi",
            Description: "Müşterinin Bireysel Krediler Başvuru Değerlendirme süreci içerisinde kabul edildiği kategorisi."
        },
        {
            Guid: uuid.v1(),
            DataKey: "UygunOlmayanMeslekler",
            Description: "Müşteri tipine göre uygun olmayan meslek listesi."
        }
    ];

    GetCustomDefinedDataServiceNode(dataKey: string): ICustomDefinedDataServiceNode | undefined {
        const nodes = this.m_CustomDefinedDataServiceNodes.filter((o) => {
            return o.DataKey === dataKey;
        });

        if (nodes.length > 0) {
            return nodes[0];
        }
        return undefined;
    }
    SaveCustomDefinedDataServiceNodes(...nodes: ICustomDefinedDataServiceNode[]) {
        nodes.forEach((o) => {
            this.m_CustomDefinedDataServiceNodes.push({
                Guid: uuid.v1(),
                DataKey: o.DataKey,
                Description: o.Description,
            });
        });
    }
}