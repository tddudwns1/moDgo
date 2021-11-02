package org.moDgo.controller.user;

import lombok.RequiredArgsConstructor;
import org.moDgo.domain.User;
import org.moDgo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    //유저 정보 등록 : 최초 로그인인 경우 새 유저 등록
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(
            @RequestBody final UserCreateRequestDto userCreateRequestDto
    ) {
        final User user = userService.searchUser(userCreateRequestDto.toEntity().getId());

        //유저 정보가 등록되어 있다면
        if (user != null) {
            return ResponseEntity.ok(
                    new UserResponseDto(user)
            );
        }
        //유저 정보가 등록되어 있지 않다면
        return ResponseEntity.ok(
                new UserResponseDto(userService.createUser(userCreateRequestDto.toEntity()))
        );
    }

    //유저 정보 상세 조회
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDto> searchUser(
            @PathVariable final String userId
    ) {
        User user = userService.searchUser(userId);
        if (user != null) {
            return ResponseEntity.ok(
                    new UserResponseDto(user)
            );
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
