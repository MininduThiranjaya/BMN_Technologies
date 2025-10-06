package lk.bmn_technologies.backend.dto.requestDTO;

public class ProductFilterDTO {
    private String category;
    private Integer minPrice;
    private Integer maxPrice;

    public ProductFilterDTO(String category, Integer maxPrice, Integer minPrice) {
        this.category = category;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Integer minPrice) {
        this.minPrice = minPrice;
    }

    public Integer getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Integer maxPrice) {
        this.maxPrice = maxPrice;
    }  
}
