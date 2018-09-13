# pom.xml

In order to run Webpack as part of your Maven build process, Eirik's [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) offers a convenient solution. It allows you to easily run npm or other tools. Here we use npm and Node v8. For configuration options, check out the plugin's documentation.

```
<!-- ====================================================================== -->
<!-- F R O N T E N D   P L U G I N                                          -->
<!-- ====================================================================== -->
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>1.6</version>

    <configuration>
        <workingDirectory>src/main/webpack.core</workingDirectory>
    </configuration>

    <executions>
      <execution>
          <id>install node and npm</id>
          <goals>
              <goal>install-node-and-npm</goal>
          </goals>
          <configuration>
              <nodeVersion>v8.11.4</nodeVersion>
          </configuration>
      </execution>

      <execution>
          <id>npm install</id>
          <goals>
              <goal>npm</goal>
          </goals>
          <configuration>
              <arguments>install</arguments>
          </configuration>
      </execution>

      <execution>
          <id>npm production</id>
          <goals>
              <goal>npm</goal>
          </goals>

          <configuration>
              <arguments>run production</arguments>
          </configuration>
      </execution>
  </executions>
</plugin>
```

To run a MVN build but skip the front end build, add the following code to the pom.xml. Run a build with `mvn clean install -Pno-frontend`

```
    <!-- ====================================================================== -->
    <!-- P R O F I L E S                                                        -->
    <!-- ====================================================================== -->
    <profiles>

        <!-- Skip Front End Build -->
        <profile>
            <id>no-frontend</id>
            <build>
                <pluginManagement>
                    <plugins>
                        <plugin>
                            <groupId>com.github.eirslett</groupId>
                            <artifactId>frontend-maven-plugin</artifactId>
                            <version>*</version>

                            <executions>
                                <execution>
                                    <id>install node and npm</id>
                                    <phase>none</phase>
                                </execution>

                                <execution>
                                    <id>npm install</id>
                                    <phase>none</phase>
                                </execution>

                                <execution>
                                    <id>npm production</id>
                                    <phase>none</phase>
                                </execution>
                            </executions>
                        </plugin>
                    </plugins>
                </pluginManagement>
            </build>
        </profile>

    </profiles>
```
