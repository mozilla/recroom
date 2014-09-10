# Rec Room Documentation

![Rec Room logo](images/recroom-logo.jpg?raw=true)


# Appendix 1: Rec Room, Yeoman and permissions on Mac OSX

We recommend installing Rec Room by typing:

```
npm install -g recroom
```

We recommend that you stay away from using sudo for npm installs as explained [here](http://howtonode.org/introduction-to-npm) by Issac Schlueter, one of the core Node.js contributors.

If you install Rec Room without sudo and see errors like the following:

```
npm ERR! Error: EACCES, mkdir '/usr/local/lib/node_modules/recroom'
npm ERR!  { [Error: EACCES, mkdir '/usr/local/lib/node_modules/recroom']
npm ERR!   errno: 3,
npm ERR!   code: 'EACCES',
npm ERR!   path: '/usr/local/lib/node_modules/recroom',
npm ERR!   fstream_type: 'Directory',
npm ERR!   fstream_path: '/usr/local/lib/node_modules/recroom',
npm ERR!   fstream_class: 'DirWriter',
npm ERR!   fstream_stack: 
npm ERR!    [ '/usr/local/lib/node_modules/npm/node_modules/fstream/lib/dir-writer.js:36:23',
npm ERR!      '/usr/local/lib/node_modules/npm/node_modules/mkdirp/index.js:46:53',
npm ERR!      'Object.oncomplete (fs.js:107:15)' ] }
npm ERR! 
npm ERR! Please try running this command again as root/Administrator.

npm ERR! System Darwin 11.4.2
npm ERR! command "node" "/usr/local/bin/npm" "install" "-g" "recroom"
npm ERR! cwd /Users/rory/Downloads/dev
npm ERR! node -v v0.10.31
npm ERR! npm -v 1.4.23
npm ERR! path /usr/local/lib/node_modules/recroom
npm ERR! fstream_path /usr/local/lib/node_modules/recroom
npm ERR! fstream_type Directory
npm ERR! fstream_class DirWriter
npm ERR! code EACCES
npm ERR! errno 3
npm ERR! stack Error: EACCES, mkdir '/usr/local/lib/node_modules/recroom'
npm ERR! fstream_stack /usr/local/lib/node_modules/npm/node_modules/fstream/lib/dir-writer.js:36:23
npm ERR! fstream_stack /usr/local/lib/node_modules/npm/node_modules/mkdirp/index.js:46:53
npm ERR! fstream_stack Object.oncomplete (fs.js:107:15)
npm ERR! 
npm ERR! Additional logging details can be found in:
npm ERR!     /Users/rory/Downloads/dev/npm-debug.log
npm ERR! not ok code 0
```

We recommend solving this on your Mac (we're assuming it's a development machine and not some type of production device) by doing the following:

```
sudo chown -R $USER /usr/local/lib/node_modules/
```

What this does is recursively change the ownership of all the files in /user/local/lib/node_modules/ to your currently logged in user. Your username is usually displayed by default in the OSX Terminal, but if you're unsure what your username is, type:

```
echo $USER
```

There are many other solutions to this problem on Stack Overflow and other places on the Internet. For a development computer with primarily one user, we recommend the above approach. 

If you'd like an alternative approach that avoids chowin'ing /usr/local/lib/node_modules/, you could try:

```
npm install --prefix ~ recroom
echo export PATH='$PATH:~/node_modules/.bin' >> ~/.bash_profile
source ~/.bash_profile
```

This does the following:
1. Tells npm to create a node_modules directory in your home directory and install Rec Room there
2. Adds the node_modules/.bin directory in your home directory to your PATH
3. Reloads your BASH profile so that your PATH will be updated

You can now call the ```recroom``` command from any directory on your system (that you have write permissions to) and recroom will work.




