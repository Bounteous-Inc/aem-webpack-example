# filter.xml

If you you place the Webpack output into a folder such as `/etc/designs/webpack.bundles`, make sure to adjust the filters so the output files get deployed to the AEM instance.
Here we added:

```
<filter root="/etc/designs/webpack.bundles" mode="replace"/>
```
