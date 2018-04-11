var mtrFill = 1;
var oldBW;
var mtrEtr = 50;
function fillMeter()
{

	if ((player.xvel >= 4 || player.xvel <= -4)||((map.xvel <= -4  && dPressed == true)||( map.xvel >= 4 && aPressed == true)))
	{
		if(bar.width <= 740){
			bar.width += mtrFill;
		}
	}
	else
	{
		if(bar.width != 0)
		bar.width -= mtrFill;
	}
	oldBW = bar.width
}