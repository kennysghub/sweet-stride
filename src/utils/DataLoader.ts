import Papa from "papaparse";

export type FitnessData = {
  Date: string;
  Steps?: number;
  Miles?: number;
};

export const loadCSV = async (filePath: string): Promise<FitnessData[]> => {
  const response = await fetch(filePath);
  const csvData = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        resolve(results.data as FitnessData[]);
      },
      error: (error: unknown) => {
        reject(error);
      },
    });
  });
};
