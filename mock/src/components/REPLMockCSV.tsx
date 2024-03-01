import { Dispatch, SetStateAction, useState } from "react";
/**
 * @author devonkearleng rmhossai
 * @version 1.0 - REPLMockCSV is where we hold our mocked data that we will use to run tests/run the mock frontend on.
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
  const malformedCSV: string[][] = [
    ["City", "State", "Price"],
    ["New York City", "NY", ""], // Missing Price column
    ["Los Angeles", "CA", "800000"],
    ["Chicago", "IL", "600000"],
    ["Houston", "TX", "400000"],
    ["Phoenix", "AZ", "350000"],
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
  mockDataMap.set("data/malformed", malformedCSV);
  mockDataMap.set("data/withHeaders", csvWithHeaders);
  mockDataMap.set("data/noHeaders", csvNoHeaders);

  return mockDataMap;
}

export function REPLMockCSVResponse() {
  const mockDataResponseMap = new Map<string, string[][]>();
  const realEstateAppraisalsResponse1: string[][] = [
    ["Chicago", "IL", "600000"],
  ];
  mockDataResponseMap.set("city chicago", realEstateAppraisalsResponse1);
  return mockDataResponseMap;
}
// TODO: Delete this examples and put a better example up.

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
