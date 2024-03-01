import { Dispatch, SetStateAction, useState } from "react";
/**
 * @author devonkearleng rmhossai
 * @version 1.0 - REPLMockCSV is where we hold our mocked data that we will use to run tests/run the mock frontend on.
 * @returns A map containing various mocked CSV data.
 */
export function REPLMockCSV() {
  const mockDataMap = new Map<string, string[][]>();
  const realEstateAppraisals: string[][] = [
    ["City", "State", "Price"],
    ["New York City", "NY", "1000000"],
    ["Los Angeles", "CA", "800000"],
    ["Chicago", "IL", "600000"],
    ["Houston", "TX", "400000"],
    ["Phoenix", "AZ", "350000"],
  ];
  const vibe: string[][] = [
    ["City", "State", "Vibe"],
    ["New York City", "NY", "yes"],
    ["Los Angeles", "CA", "yes"],
    ["Chicago", "IL", "no"],
    ["Houston", "TX", "yes"],
    ["Phoenix", "AZ", "no"],
    ["Boston", "MA", "yes"],
    ["New Orleans", "LA", "yes"]
  ];
  const jobSecurity: string[][] = [
    ["City", "State", "Security"],
    ["New York City", "NY", "high"],
    ["Los Angeles", "CA", "mid"],
    ["Chicago", "IL", "low"],
    ["Houston", "TX", "high"],
    ["Phoenix", "AZ", "mid"],
  ];
  const empty: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const csvWithHeaders: string[][] = [
    ["City", "State", "Price"],
    ["New York City", "NY", "1000000"],
    ["Los Angeles", "CA", "800000"],
    ["Chicago", "IL", "600000"],
    ["Houston", "TX", "400000"],
    ["Phoenix", "AZ", "350000"],
  ];
  const csvNoHeaders: string[][] = [
    ["New York City", "NY", "1000000"],
    ["Los Angeles", "CA", "800000"],
    ["Chicago", "IL", "600000"],
    ["Houston", "TX", "400000"],
    ["Phoenix", "AZ", "350000"],
  ];
  mockDataMap.set("data/appraisal", realEstateAppraisals);
  mockDataMap.set("data/vibe", vibe);
  mockDataMap.set("data/career", jobSecurity);
  mockDataMap.set("data/empty", empty);
  mockDataMap.set("data/withHeaders", csvWithHeaders);
  mockDataMap.set("data/noHeaders", csvNoHeaders);
  return mockDataMap;
}

/**
 * REPLMockCSVResponse provides mocked responses for specific CSV queries.
 * @returns A map containing mocked responses for CSV queries.
 */
export function REPLMockCSVResponse() {
  const mockDataResponseMap = new Map<string, string[][]>();
  const realEstateAppraisalsResponse1: string[][] = [
    ["Chicago", "IL", "600000"],
  ];
  const realEstateAppraisalsResponse2: string[][] = [
    ["New York City", "NY", "1000000"],
  ];
  mockDataResponseMap.set("city chicago", realEstateAppraisalsResponse1);
  mockDataResponseMap.set("2 NY", realEstateAppraisalsResponse2);
  return mockDataResponseMap;
}

/**
 * REPLCSVMalformed provides mocked malformed CSV data.
 * @returns A map containing mocked malformed CSV data.
 */
export function REPLCSVMalformed() {
  const mockCSVMalformedMap = new Map<string, string[][]>();
  const malformedCSV: string[][] = [
    ["City", "State", "Price"],
    ["New York City", "NY", ""], // Missing Price column
    ["Los Angeles", "CA", "800000"],
    ["Chicago", "IL", "600000"],
    ["Houston", "TX", "400000"],
    ["Phoenix", "AZ", "350000"],
  ];
  mockCSVMalformedMap.set("data/appraisal_malformed", malformedCSV);
  return mockCSVMalformedMap;
}
export function REPMalformedCSVResponse() {
  const mockDataResponseMap = new Map<string, string[][]>();
  const realEstateAppraisalsResponse1: string[][] = [
    ["Chicago", "IL", "600000"],
  ];
  mockDataResponseMap.set("city chicago", realEstateAppraisalsResponse1);
  return mockDataResponseMap;
}

export function REPLCSVwHeadersResponse() {
  const mockDataResponseMap = new Map<string, string[][]>();
  const realEstateAppraisalsResponse1: string[][] = [
    ["New York City", "NY", "1000000"],
    ["Los Angeles", "CA", "800000"],
    ["Chicago", "IL", "600000"],
    ["Houston", "TX", "400000"],
    ["Phoenix", "AZ", "350000"],
  ];
  mockDataResponseMap.set("city chicago", realEstateAppraisalsResponse1); // Example data, replace key accordingly
  return mockDataResponseMap;
}

export function REPLCSVwNoHeadersResponse() {
  const mockDataResponseMap = new Map<string, string[][]>();
  const realEstateAppraisalsResponse1: string[][] = [
    ["Chicago", "IL", "600000"],
  ];
  mockDataResponseMap.set("city chicago", realEstateAppraisalsResponse1); // Example data, replace key accordingly
  return mockDataResponseMap;
}
