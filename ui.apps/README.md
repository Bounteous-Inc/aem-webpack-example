# pom.xml

In order to run Webpack as part of your Maven build process, Eirik's [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) offers a convenient solution. It allows you to easily run npm, Yarn or other tools. Here we use Yarn and Node 7. For configuration options, check out the plugin's documentation.

```
<!-- ====================================================================== -->
<!-- F R O N T E N D   P L U G I N                                          -->
<!-- ====================================================================== -->
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>1.5</version>

    <configuration>
        <workingDirectory>src/main/webpack</workingDirectory>
    </configuration>

    <executions>
        <execution>
            <id>install node and npm</id>
            <goals>
                <goal>install-node-and-yarn</goal>
            </goals>
            <configuration>
                <nodeVersion>v7.2.1</nodeVersion>
                <yarnVersion>v0.20.3</yarnVersion>
            </configuration>
        </execution>

        <execution>
            <id>yarn install</id>
            <goals>
                <goal>yarn</goal>
            </goals>
            <configuration>
                <arguments>install</arguments>
            </configuration>
        </execution>

        <execution>
            <id>yarn deploy</id>
            <goals>
                <goal>yarn</goal>
            </goals>

            <configuration>
                <arguments>run deploy</arguments>
            </configuration>
        </execution>
    </executions>
</plugin>
```
