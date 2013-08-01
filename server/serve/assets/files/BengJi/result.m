y0=[-160,0];
[t,y]=ode45('bengji',[0,240],y0);
x1=300.-y(:,1);
plot(t,x1);grid
plot(t,y(:,1));grid
