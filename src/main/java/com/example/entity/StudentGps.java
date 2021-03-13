package com.example.entity;

import org.springframework.data.elasticsearch.annotations.GeoPointField;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

public class StudentGps {

	private String name;

	@GeoPointField
	private GeoPoint location;

}
