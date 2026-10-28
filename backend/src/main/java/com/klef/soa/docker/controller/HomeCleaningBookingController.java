package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.HomeCleaningBookingRequest;
import com.klef.soa.docker.dto.HomeCleaningBookingResponse;
import com.klef.soa.docker.service.HomeCleaningBookingService;
import org.springframework.web.bind.annotation.CrossOrigin;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:8080"
})
@RestController
@Validated
@RequestMapping("/homecleaningbooking")
public class HomeCleaningBookingController
{
    @Autowired
    private HomeCleaningBookingService service;

    @GetMapping("/")
    public String home()
    {
        return "Home Cleaning Booking Service Project";
    }

    @Value("${server.port}")
    private String port;

    @GetMapping("/instance")
    public String instance()
    {
        return "Home Cleaning Booking Service instance running on port: " + port;
    }

    

    @PostMapping("/add")
    public ResponseEntity<HomeCleaningBookingResponse> saveHomeCleaningBooking(
            @Valid @RequestBody HomeCleaningBookingRequest request)
    {
        return new ResponseEntity<>(service.saveHomeCleaningBooking(request), HttpStatus.CREATED);
    }

    @GetMapping("displayall")
    public ResponseEntity<List<HomeCleaningBookingResponse>> getAllHomeCleaningBookings()
    {
        System.out.println("Home Cleaning Booking Service instance running on port : " + port);
        return ResponseEntity.ok(service.getAllHomeCleaningBookings());
    }

    @GetMapping("display/{id}")
    public ResponseEntity<HomeCleaningBookingResponse> getHomeCleaningBookingById(@PathVariable Long id)
    {
        return ResponseEntity.ok(service.getHomeCleaningBookingById(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<HomeCleaningBookingResponse> updateHomeCleaningBooking(
            @PathVariable Long id,
            @Valid @RequestBody HomeCleaningBookingRequest request)
    {
        return ResponseEntity.ok(service.updateHomeCleaningBooking(id, request));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteHomeCleaningBooking(@PathVariable Long id)
    {
        service.deleteHomeCleaningBooking(id);
        return ResponseEntity.ok("Home cleaning booking deleted successfully.");
    }
}