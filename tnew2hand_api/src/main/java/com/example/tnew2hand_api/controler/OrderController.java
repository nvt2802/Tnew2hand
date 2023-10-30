package com.example.tnew2hand_api.controler;

import com.example.tnew2hand_api.dto.UserDto;
import com.example.tnew2hand_api.model.AppOrder;
import com.example.tnew2hand_api.model.CartItem;
import com.example.tnew2hand_api.model.Product;
import com.example.tnew2hand_api.model.User;
import com.example.tnew2hand_api.service.IOrderService;
import com.example.tnew2hand_api.service.IProductService;
import com.example.tnew2hand_api.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private IOrderService orderService;
    @Autowired
    private IUserService userService;
    @Autowired
    private IProductService productService;

    @GetMapping("/get-quantity-cart")
    public ResponseEntity<?> getQuantityOnCart(@RequestParam(defaultValue = "") String userName) {
        if (userName.equals("")) {
            return new ResponseEntity<>(0, HttpStatus.OK);
        }
        User user = userService.getByUserName(userName);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        int quantity = orderService.getQuantityCartByUser(user);
        return new ResponseEntity<>(quantity, HttpStatus.OK);
    }

    @PostMapping("/add-to-card")
    public ResponseEntity<?> addToCart(@RequestParam Long productId,
                                       @RequestParam(defaultValue = "") String userName,
                                       @RequestParam(defaultValue = "1") int quantity
    ) {
        User user = userService.getByUserName(userName);
        if (user == null) {
            return new ResponseEntity<>("User is not found", HttpStatus.NOT_FOUND);
        }
        Product product = productService.getById(productId);
        if (product == null) {
            return new ResponseEntity<>("Product is not found", HttpStatus.NOT_FOUND);
        }
        //check quantity after save

        CartItem cartItem = orderService.addToCart(product, user, quantity);
        if (cartItem == null) {
            return new ResponseEntity<>("Can not add to cart", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>("Added to cart", HttpStatus.OK);

    }

    @GetMapping("/get-all-cart")
    public ResponseEntity<?> getAllCartItem(@RequestParam String userName) {
        User user = userService.getByUserName(userName);
        if (user == null) {
            return new ResponseEntity<>("User is not found", HttpStatus.NOT_FOUND);
        }
        List<CartItem> cartItemList = orderService.getAllCart(user);
        return new ResponseEntity<>(cartItemList, HttpStatus.OK);
    }

    @DeleteMapping("/delete-cart-item/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long id) {
        CartItem cartItem = orderService.deleteById(id);
        if (cartItem == null) {
            return new ResponseEntity<>("Can't find cart item", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestParam String userName,
                                         @RequestBody UserDto userDto,
                                         BindingResult bindingResult
    ) {
        new UserDto().validate(userDto, bindingResult);
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError fieldError : bindingResult.getFieldErrors()
            ) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.NOT_ACCEPTABLE);
        }
        User user = userService.getByUserName(userName);

        if (user == null) {
            return new ResponseEntity<>("User is not found", HttpStatus.NOT_FOUND);
        }
        Boolean checkQuantity = orderService.checkQuantityOfCart(user);
        if (checkQuantity) {
            Long orderId = orderService.saveOrder(user, userDto);
            System.out.println(orderId);
            if (orderId != null) {
                return new ResponseEntity<>(orderId, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        } else {
            return new ResponseEntity<>("There is a problem with the quantity, possibly due to overstock, please check again", HttpStatus.NOT_ACCEPTABLE);
        }
    }
//    @GetMapping("/check-quantity-cart")
//    public ResponseEntity<?> checkQuantityInCart(@RequestParam String userName){
//        User user = userService.getByUserName(userName);
//
//        if (user == null) {
//            return new ResponseEntity<>("User is not found", HttpStatus.NOT_FOUND);
//        }
//        orderService.checkQuantity(userName);
//    }

    @GetMapping("/get-order-history")
    public ResponseEntity<?> getOrderHistory(@RequestParam String userName){
        User user = userService.getByUserName(userName);
        if (user == null) {
            return new ResponseEntity<>("User is not found", HttpStatus.NOT_FOUND);
        }
        List<AppOrder> orders = orderService.findByUser(user);
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }

    @GetMapping("/get-order")
    public ResponseEntity<?> getOrder(@RequestParam Long id ,
                                      @RequestParam String userName
                ){
        AppOrder order = orderService.findById(id);
        if(order==null){
            return new ResponseEntity<>("Order not found",HttpStatus.NOT_FOUND);
        }
        if(!Objects.equals(order.getUser().getAppUser().getUserName(), userName)){
            return new ResponseEntity<>("Order not found",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(order,HttpStatus.OK);
    }
}
