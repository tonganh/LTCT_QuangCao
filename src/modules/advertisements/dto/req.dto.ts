import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class AdvertisementReqDto {
  @ApiProperty({ default: "xin chao toi den tu trai dat" })
  @IsString()
  title: string;
  @ApiProperty({ default: "hahahasdhhasdf" })
  @IsString()
  content: string;
  @ApiProperty({ default: "https://www.facebook.com/chemistryismylove/" })
  @IsString()
  advertismentUrl: string;
  @ApiPropertyOptional({
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

  @ApiProperty({ default: new Date("2021-12-08T00:00:00") })
  startAt: Date;

  @ApiProperty({ default: new Date("2021-12-08T23:59:59") })
  endAt: Date;

  @ApiPropertyOptional({ default: "124123", description: "ID của sản phẩm muốn lấy thông tin cho vào quảng cáo." })
  productId: string
}

export class ContentSendMail {
  @ApiProperty({ default: "Tong Anh d.trai" })
  content: string;
}
