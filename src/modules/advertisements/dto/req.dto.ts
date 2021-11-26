import { ApiProperty } from "@nestjs/swagger";
export class AdvertisementReqDto {
  @ApiProperty({ default: "tong ngoc anh dep trai vl" })
  title: string;
  @ApiProperty({ default: "hahahasdhhasdf" })
  content: string;
  @ApiProperty({ default: "https://www.facebook.com/chemistryismylove/" })
  advertismentUrl: string;
  @ApiProperty({
    default:
      "https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg",
  })
  imageUrl: string;
  @ApiProperty({ description: "Quang cao hay gi gi", default: "quang_cao" })
  type: string;
  @ApiProperty({ default: "mock_up" })
  advertisingDisplayType: string;

  @ApiProperty({ default: "header" })
  advertisementPosition: string;

  @ApiProperty({ default: "activated" })
  status: string;
}
