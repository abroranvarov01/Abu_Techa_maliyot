export interface ContractType {
  data: {
    contracts: {
      attachment: {
        origName: string;
        size: number;
        url: string;
      };
      course: {
        createdAt: string;
        id: number;
        name: string;
      }[];
      createdAt: string;
      id: number;
      title: string;
    }[];
  };
}
