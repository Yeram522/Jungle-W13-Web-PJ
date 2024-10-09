package jungle.board;

public record ApiResponse<T> (
        T data,
        String message
){

    public static <T> ApiResponse<T> ofSuccess(T data) {
        return new ApiResponse<>(data, "성공");
    }
}
