package jungle.board;

public record ApiResponse<T> (
        T data,
        String message,
        String code
){

    public static <T> ApiResponse<T> ofSuccess(T data) {
        return new ApiResponse<>(data, "성공", "S001");
    }
}
