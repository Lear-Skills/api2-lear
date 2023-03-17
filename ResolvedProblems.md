## "This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag."
1- When you make changes to tsconfig, sometimes you need to restart your IDE or Code Editor
2- import * as express from 'express';
3- My problem was that I tried to run tsc as tsc -w index.ts.
However, as said here https://stackoverflow.com/a/33244030/5711655 if you run tsc with a specified input file, it won't use the tsconfig.json in your project directory! So in my case I had to use tsc -w.
https://stackoverflow.com/questions/62273153 this-module-is-declared-with-using-export-and-can-only-be-used-with-a-defau