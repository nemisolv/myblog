package com.springboot.blog.security.oauth2.user;

import java.util.Map;

public class GithubOauth2UserInfo extends Oauth2UserInfo {

    public GithubOauth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return ((Integer) attributes.get("id")).toString();
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override

    public String getImageUrl() {
        return (String) attributes.get("avatar_url");
    }
}
