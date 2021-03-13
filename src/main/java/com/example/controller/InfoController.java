package com.example.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.example.entity.ResultVo;
import com.example.entity.StockQuote;
import com.example.util.Base64Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Reference: https://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html
 */
@Controller
public class InfoController {

    @Autowired
    private SimpMessagingTemplate messageTemplate;

    @RequestMapping(value = "/price", method = RequestMethod.POST)
    public void priceManualConvert(@RequestParam("Fantastic Food") Double val1,
                                   @RequestParam("Marvellous Car") Double val2) {
        StockQuote stock1 = new StockQuote("Fantastic Food", val1);
        StockQuote stock2 = new StockQuote("Marvellous Car", val2);
        List<StockQuote> list = new ArrayList<>();
        list.add(stock1);
        list.add(stock2);

        this.messageTemplate.convertAndSend("/topic/price", new ResultVo(200, "success", list));
    }

    @Scheduled(fixedDelay = 10000)
    public void priceManualConvert() {
        double val1 = (new BigDecimal(Math.random() * 1000 + "")).setScale(3, BigDecimal.ROUND_HALF_UP).doubleValue();
        double val2 = (new BigDecimal(Math.random() * 1000 + "")).setScale(3, BigDecimal.ROUND_HALF_UP).doubleValue();
        StockQuote stock1 = new StockQuote("Fantastic Food", val1);
        StockQuote stock2 = new StockQuote("Marvellous Car", val2);
        List<StockQuote> list = new ArrayList<>();
        list.add(stock1);
        list.add(stock2);

        this.messageTemplate.convertAndSend("/topic/price", new ResultVo(200, "success", list));
    }

    @Scheduled(fixedDelay = 5000)
    @RequestMapping(value = "/price-fast", method = RequestMethod.POST)
    public void autoPrice() {
        double val1 = (new BigDecimal(Math.random() * 1000 + "")).setScale(3, BigDecimal.ROUND_HALF_UP).doubleValue();
        double val2 = (new BigDecimal(Math.random() * 1000 + "")).setScale(3, BigDecimal.ROUND_HALF_UP).doubleValue();

    	StockQuote stock1 = new StockQuote("Airplane 1", val1);
    	StockQuote stock2 = new StockQuote("Electricity", val2);

        List<StockQuote> list = new ArrayList<>();
        list.add(stock1);
        list.add(stock2);

        this.messageTemplate.convertAndSend("/topic/price-fast", new ResultVo(200, "success", list));
    }
}
