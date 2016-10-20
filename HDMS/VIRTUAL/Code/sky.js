function generatePNG(width, height, resolution){
            var p = new PNGlib(512, 512, 256); // construcor takes height, weight and color-depth
            var background = p.color(0, 0, 0, 0); // set the background transparent
            var noise = [[]];
            var noiseWidth = width;
            var noiseHeight = height;

            function generateNoise(){

                noise[0][0] =0.0;
                for(var x=0; x<noiseWidth; x++){
                    noise[x] = [];
                    for(var y=0; y<noiseHeight; y++){
                        n = Math.floor((Math.random() * 32768) + 1) / 32768.0;
                        noise[x][y] = n;
                    }
                }
            }

            generateNoise();


            function smoothNoise(x, y){
                fractX = x - Math.floor(x);
                fractY = y - Math.floor(y);

                x1 = (Math.floor(x) + noiseWidth) % noiseWidth;
                y1 = (Math.floor(y) + noiseHeight) % noiseHeight;

                x2 = (x1 + noiseWidth - 1) % noiseWidth;
                y2 = (y1 + noiseHeight - 1) % noiseHeight;

                var value = 0.0;
                value += fractX  * fractY * noise[x1][y1];
                value += fractX*(1 - fractY) * noise[x1][y2];
                value += (1 - fractX) * fractY * noise[x2][y1];
                value += (1 - fractX) * (1 - fractY) * noise[x2][y2];

                return value;

            }

            function turbulence(x,y,size){
                value = 0.0;
                initialSize = size;
                while(size >=1){
                    value += smoothNoise(x/size,y/size) * size;
                    size /= 2.0;
                }

                return (128.0 * value / initialSize);

            }

            var c;
            for (var i = 0; i < width; i++) {
                for (var j=0; j<height; j++){
                // use a color triad of Microsofts million dollar color
                    c = turbulence(i,j,resolution) % 256;
                    var g;
                    if(c+90<=255){
                        g = c+90;
                    } else {
                        g = 255;   
                    }
                    p.buffer[p.index(i, j)] = p.color(c,g,255);
                }
            }
            
            return p.getBase64();
        }