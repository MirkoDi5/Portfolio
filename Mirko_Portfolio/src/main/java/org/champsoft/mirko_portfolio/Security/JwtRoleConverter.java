package org.champsoft.mirko_portfolio.Security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class JwtRoleConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {

        // 1️⃣ Permissions (optional, fine to keep)
        List<String> permissions = jwt.getClaimAsStringList("permissions");
        if (permissions == null) permissions = Collections.emptyList();

        // 2️⃣ Roles from Auth0 (FIXED namespace)
        List<String> roles =
                jwt.getClaimAsStringList("https://api.portfolio.com/roles");
        if (roles == null) roles = Collections.emptyList();

        // 3️⃣ Map to Spring authorities
        Collection<SimpleGrantedAuthority> authorities = Stream.concat(
                permissions.stream().map(SimpleGrantedAuthority::new),
                roles.stream().map(role ->
                        new SimpleGrantedAuthority("ROLE_" + role.toUpperCase())
                )
        ).collect(Collectors.toList());

        return new JwtAuthenticationToken(jwt, authorities);
    }
}
