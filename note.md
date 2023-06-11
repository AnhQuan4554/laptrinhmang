// gcc -g svr.cpp -lstdc++ -lws2_32 -o svr.exe
// gcc -g cli.cpp -lstdc++ -lws2_32 -o cli.exe
/////////////THay đổi so với ban đầu //////////////////
1> Thay vì ban đầu chỉ nhập được một lần và mỗi lần chỉ ghi được một thông tin và trong
file txt thì bây giờ có thể nhập vô số lần
2> THêm các phương thức getter , setter cho class .
3> Dữ liệu khi nhận được sẽ được lưu vào trong class , và dữ liệu khi gửi sẽ được chuyển
đi cách lấy dữ liệu trong class ( sử dụng getter ) thay vì là chuyển đi những dữ liệu nhận được
từ phía client
4> Thêm thông tin tuổi cho sinh viên
5> Format lại những dữ liệu lưu trong file txt sao cho chúng thành hàng dễ đọc hơn
