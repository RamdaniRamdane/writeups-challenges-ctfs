package
{
   import flash.display.Loader;
   import flash.display.Sprite;
   import flash.utils.ByteArray;
   
   public class RootMe extends Sprite
   {
      
      private static const KEY:String = "rootmeifyoucan";
      
      private const EmbeddedSWF:Class;
      
      public function RootMe()
      {
         var _loc2_:Loader = null;
         this.EmbeddedSWF = RootMe_EmbeddedSWF;
         super();
         var _loc1_:ByteArray = new this.EmbeddedSWF();
         if(_loc1_.length != 0)
         {
            XOR(_loc1_,KEY);
            _loc2_ = new Loader();
            _loc2_.loadBytes(_loc1_);
            addChild(_loc2_);
         }
      }
      
      private static function XOR(param1:ByteArray, param2:String) : void
      {
         var _loc3_:Number = 0;
         var _loc4_:Number = 0;
         while(_loc4_ < param1.length)
         {
            param1[_loc4_] ^= param2.charCodeAt(_loc3_);
            _loc3_++;
            if(_loc3_ >= param2.length)
            {
               _loc3_ = 0;
            }
            _loc4_++;
         }
      }
   }
}

