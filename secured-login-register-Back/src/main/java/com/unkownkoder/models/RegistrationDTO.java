package com.unkownkoder.models;

public class RegistrationDTO {
    private String username;
    private String password;

    private String gender;

    public RegistrationDTO(){
        super();
    }

    public RegistrationDTO(String username, String password, String gender){
        super();
        this.username = username;
        this.password = password;
        this.gender = gender;
    }

    public String getUsername(){
        return this.username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getPassword(){
        return this.password;
    }

    public void setPassword(String password){
        this.password = password;
    }


    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "RegistrationDTO{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}