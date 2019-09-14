package com.smt.helper;

import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.json.JSONException;//http://bit.ly/12O4D2w

public class JSONtoXML {
	private static Map<String, List> InputPath;
	private static String OutputPath = "C:/Users/Embel PC1/Desktop/output.xml";

	public void shree(Map<String, List> returnMap) throws FileNotFoundException, IOException, JSONException {
		// Read JSON File
		InputPath = returnMap;
		long startTime = System.currentTimeMillis();
		long endTime = System.currentTimeMillis();
		long duration = endTime - startTime;
		System.out.println("Read File Duration: " + duration);

		// Convert JSON to XML
		startTime = System.currentTimeMillis();
		String xml = convert(InputPath, "root");// State name of root element
												// tag
		endTime = System.currentTimeMillis();
		duration = endTime - startTime;
		System.out.println("Process Data Duration: " + duration);

		// Write XML File
		startTime = System.currentTimeMillis();
		writeFile(OutputPath, xml);
		endTime = System.currentTimeMillis();
		duration = endTime - startTime;
		System.out.println("Write File Duration: " + duration);
	}

	public static String convert(Map<String, List> inputPath2, String root) throws JSONException {
		org.json.JSONObject jsonFileObject = new org.json.JSONObject(inputPath2);
		String xml = "<?xml version=\"1.0\" encoding=\"ISO-8859-15\"?>\n<" + root + ">" + org.json.XML.toString(jsonFileObject) + "</" + root + ">";
		return xml;
	}

	public static void writeFile(String filepath, String output) throws FileNotFoundException, IOException {
		FileWriter ofstream = new FileWriter(filepath);
		//try (BufferedWriter out = new BufferedWriter(new FileReader(ofstream))) {
		try (BufferedWriter out = new BufferedWriter(ofstream))
		{
			out.write(output);
		}
	}
}
