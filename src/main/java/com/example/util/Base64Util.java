package com.example.util;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class Base64Util {
    private final static Base64.Encoder encoder = Base64.getEncoder();
    private final static Base64.Decoder decoder = Base64.getDecoder();

    public static String encode(String data) {
        String encode = encoder.encodeToString(data.getBytes(StandardCharsets.UTF_8));
        return encode;
    }

    public static String decode(String data) {
        String decode = new String(decoder.decode(data), StandardCharsets.UTF_8);
        return decode;
    }

}
