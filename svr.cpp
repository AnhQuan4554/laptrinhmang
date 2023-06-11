#include <winsock2.h>
#include <bits/stdc++.h>
using namespace std;

#pragma comment(lib, "ws2_32.lib")
#define BUFFER_SIZE 1024
// gcc -g svr.cpp -lstdc++ -lws2_32 -o svr.exe

class Student
{
private:
    string studentCode;
    string nameStudent;
    string old;
   

public:

   
    string getStudentCode()
    {
        return studentCode;
    }
    void setStudentCode(string studentCode)
    {
        this->studentCode = studentCode;
    }
    string getNameStudent()
    {
        return nameStudent;
    }
    void setNameStudent(string nameStudent)
    {
        this->nameStudent = nameStudent;
    }
    string getOld()
    {
        return old;
    }
    void setOld(string old)
    {
        this->old = old;
    }
   
};

vector<string> newStringData;
vector<int> newIntegerData;
void tach_chuoi(char str[])
{
    newStringData.clear();
    // newIntegerData.clear();
    stringstream ss(str);
    string token;
    newStringData.clear();
    while (ss >> token)
    {
        newStringData.push_back(token);
        // newIntegerData.push_back(atoi(token.c_str()));
    }
}

int main()
{
    WSADATA wsaData;
    SOCKET sock;
    struct sockaddr_in server, client;
    int slen = sizeof(client);
    char buf[512];

    // initialize Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
    {
        printf("Failed to initialize Winsock.\n");
        return 1;
    }

    // create a socket
    if ((sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP)) == SOCKET_ERROR)
    {
        printf("Failed to create socket.\n");
        return 1;
    }

    // setup server address
    memset((char *)&server, 0, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_port = htons(8888);
    server.sin_addr.s_addr = INADDR_ANY;

    // bind socket to server address
    if (bind(sock, (struct sockaddr *)&server, sizeof(server)) == SOCKET_ERROR)
    {
        printf("Failed to bind socket.\n");
        return 1;
    }

    printf("Server started.\n");

    // wait for incoming messages

    while (1)
    {
        char receivedData[1024];
        memset(buf, 0, sizeof(buf));

        int recv_len = recvfrom(sock, buf, sizeof(buf), 0, (struct sockaddr *)&client, &slen);
        if (recv_len == SOCKET_ERROR)
        {
            printf("Khong nhan duoc tu Client.\n");
            return 1;
        }
        printf("Nhan tu client: %s\n", buf);
        strcpy(receivedData, buf);
        receivedData[recv_len] = '\0';
        // handle all event
       
        tach_chuoi(receivedData);
        Student stu ;
        stu.setStudentCode(newStringData[0]);
        stu.setNameStudent(newStringData[1]) ;
        stu.setOld(newStringData[2]) ;
        /* start push infor student to file txt */
        ofstream fout("sinhvien.txt", ios::app);
        if (fout.is_open())
        {
            fout<<"Thong tin sinh vien la "<<endl;
            fout<<"Ma sinh vien :"<<stu.getStudentCode()<<endl;
            fout<<"Ten sinh vien :"<<stu.getNameStudent()<<endl;
            fout<<"Tuoi sinh vien :"<<stu.getOld()<<endl;
            fout.close();
        }
        /* end push infor student to file txt */
        /* show infor to screen in server */
        char result[BUFFER_SIZE];
            strcpy(result, "Thong tin sinh vien da duoc luu"); // send data to client 
            // cout<<result;//show the screen
       

        // send back to client
        int send_len = sendto(sock, result, sizeof(result), 0, (struct sockaddr *)&client, slen);
        if (send_len < 0)
        {
            cout << "Gui lai cho client khong thanh cong!" << endl;
        }
        cout << "\n Tra lai ket qua cho client" << endl;
    }

    closesocket(sock);
    WSACleanup();

    return 0;
}
