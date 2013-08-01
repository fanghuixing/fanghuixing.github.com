function ydot=f(t,y)
m=160;k=4;g=32;
x=y(1);
x_dot=y(2);
if x>0
    ydot=[0,1;-k*g/m,-0.24/m-(0.05/m)*abs(x_dot)]*y+[0;g+0.9/m];
else
    ydot=[0,1;0,-0.24/m-(0.05/m)*abs(x_dot)]*y+[0;g+0.9/m];
end