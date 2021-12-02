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
        User user = userService.searchUser(userCreateRequestDto.toEntity().getId());

        //유저 정보가 등록되어 있지 않으면
        if (user == null) {
            User newUser = userService.createUser(userCreateRequestDto.toEntity());
            System.out.println("newUser = " + newUser.getTotalBadScore());
            return ResponseEntity.ok(
                    new UserResponseDto(newUser)
            );
        }
        //유저 정보가 등록되어 있으면
        return ResponseEntity.ok(
                new UserResponseDto(userCreateRequestDto.toEntity()));
    }

    //유저 정보 상세 조회
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDto> searchUser(
            @PathVariable final String userId
    ) {
        User user = userService.searchUser(userId);
        userService.updateTotalScore(userId);
        UserResponseDto userResponseDto = new UserResponseDto(user);
        return new ResponseEntity(userResponseDto,HttpStatus.OK);
    }
}
