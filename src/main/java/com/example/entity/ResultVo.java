package com.example.entity;

import com.example.util.Base64Util;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ResultVo {
	private Integer code;
	private String msg;
	private Object data;

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public ResultVo(Integer code, String msg, Object data) {
		try {
			this.code = code;
			this.msg = msg;
			ObjectMapper mapper = new ObjectMapper();
			String jsonInString = mapper.writeValueAsString(data);
			this.data = Base64Util.encode(jsonInString);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

	}
}
