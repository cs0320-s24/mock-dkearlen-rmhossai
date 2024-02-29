import { Dispatch, SetStateAction, useState } from "react";

export function REPLMockCSV(){
    const mockDataMap = new Map<string, string[][]>();
    const realEstateAppraisals: string[][] = [
      ["City", "State", "Price"],  
      ["New York City", "NY", "1000000"],
      ["Los Angeles", "CA", "800000"],
      ["Chicago", "IL", "600000"],
      ["Houston", "TX", "400000"],
      ["Phoenix", "AZ", "350000"],
    ];
    mockDataMap.set("data/appraisal", realEstateAppraisals);
    
    return mockDataMap;
}

export function REPLMockCSVResponse(){
    const mockDataResponseMap = new Map<string, string[][]>();
    const realEstateAppraisalsResponse1: string[][] = [
      ["Chicago", "IL", "600000"],
    ];
    mockDataResponseMap.set("city chicago", realEstateAppraisalsResponse1);
    return mockDataResponseMap;
}